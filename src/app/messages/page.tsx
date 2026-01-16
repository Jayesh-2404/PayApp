"use client";

import { useState, useEffect, useRef } from "react";
import { BiMessageSquareDetail, BiSend, BiPlus, BiDollar, BiUser, BiCheckCircle, BiX, BiSearch } from "react-icons/bi";

type Friend = {
    id: string;
    name: string;
    payId: string;
};

type Message = {
    id: string;
    text: string;
    senderId: string;
    createdAt: string;
    type: 'text' | 'payment';
    amount?: number;
};

export default function MessagesPage() {
    const [friends, setFriends] = useState<Friend[]>([]);
    const [selectedFriend, setSelectedFriend] = useState<Friend | null>(null);
    const [messages, setMessages] = useState<Message[]>([]);
    const [newMessage, setNewMessage] = useState("");
    const [showSendMoney, setShowSendMoney] = useState(false);
    const [amount, setAmount] = useState("");
    const [sendingMoney, setSendingMoney] = useState(false);
    const [moneySent, setMoneySent] = useState(false);
    const [showAddFriend, setShowAddFriend] = useState(false);
    const [friendPayId, setFriendPayId] = useState("");
    const [addingFriend, setAddingFriend] = useState(false);
    const [addFriendMessage, setAddFriendMessage] = useState("");
    const [isLoadingFriends, setIsLoadingFriends] = useState(true);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    // Prevent double payment
    const isPaymentProcessing = useRef(false);

    useEffect(() => {
        fetchFriends();
    }, []);

    const fetchFriends = async () => {
        setIsLoadingFriends(true);
        try {
            const res = await fetch("/api/friends");
            const data = await res.json();
            if (Array.isArray(data)) setFriends(data);
        } catch (err) {
            console.error("Failed to fetch friends:", err);
        } finally {
            setIsLoadingFriends(false);
        }
    };

    const addFriend = async () => {
        if (!friendPayId.trim() || addingFriend) return;

        setAddingFriend(true);
        setAddFriendMessage("");

        try {
            const res = await fetch("/api/friends", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ payId: friendPayId }),
            });

            const data = await res.json();

            if (res.ok) {
                setAddFriendMessage(`${data.friend?.name || "Friend"} added!`);
                setFriendPayId("");
                fetchFriends();
                setTimeout(() => {
                    setShowAddFriend(false);
                    setAddFriendMessage("");
                }, 1500);
            } else {
                setAddFriendMessage(data.error || "Failed to add friend");
            }
        } catch (err) {
            setAddFriendMessage("An error occurred");
        } finally {
            setAddingFriend(false);
        }
    };

    const sendMoney = async () => {
        if (!selectedFriend || !amount || isPaymentProcessing.current || sendingMoney) return;

        isPaymentProcessing.current = true;
        setSendingMoney(true);

        try {
            const res = await fetch("/api/transfer", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    receiverPayId: selectedFriend.payId,
                    amount: parseFloat(amount),
                    idempotencyKey: `msg-${Date.now()}-${selectedFriend.payId}-${amount}`
                }),
            });

            if (res.ok) {
                setMessages(prev => [...prev, {
                    id: Date.now().toString(),
                    text: `Sent ₹${amount}`,
                    senderId: "me",
                    createdAt: new Date().toISOString(),
                    type: 'payment',
                    amount: parseFloat(amount)
                }]);
                setMoneySent(true);
                setTimeout(() => {
                    setMoneySent(false);
                    setAmount("");
                    setShowSendMoney(false);
                    isPaymentProcessing.current = false;
                }, 2000);
            } else {
                const data = await res.json();
                alert(data.error || "Failed to send money");
                isPaymentProcessing.current = false;
            }
        } catch (err) {
            console.error(err);
            alert("Failed to send money");
            isPaymentProcessing.current = false;
        } finally {
            setSendingMoney(false);
        }
    };

    const sendMessage = () => {
        if (!newMessage.trim()) return;

        setMessages(prev => [...prev, {
            id: Date.now().toString(),
            text: newMessage,
            senderId: "me",
            createdAt: new Date().toISOString(),
            type: 'text'
        }]);
        setNewMessage("");
    };

    return (
        <div className="max-w-5xl mx-auto">
            <div className="mb-6 flex justify-between items-center">
                <div>
                    <h1 className="text-2xl font-bold">Messages</h1>
                    <p className="text-muted-foreground text-sm">Chat with friends & send money</p>
                </div>
                <button
                    onClick={() => setShowAddFriend(true)}
                    className="flex items-center gap-2 px-4 py-2.5 bg-primary text-primary-foreground rounded-xl text-sm font-medium hover:opacity-90 transition-opacity"
                >
                    <BiPlus className="w-4 h-4" />
                    Add Friend
                </button>
            </div>

            {/* Add Friend Modal */}
            {showAddFriend && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
                    <div className="bg-card border border-border rounded-2xl p-6 w-full max-w-sm mx-4 shadow-2xl">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-lg font-bold">Add Friend by PayID</h3>
                            <button
                                onClick={() => { setShowAddFriend(false); setAddFriendMessage(""); setFriendPayId(""); }}
                                className="p-1 hover:bg-accent rounded-lg transition-colors"
                            >
                                <BiX className="w-5 h-5" />
                            </button>
                        </div>

                        <div className="relative mb-4">
                            <BiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground w-5 h-5" />
                            <input
                                type="text"
                                value={friendPayId}
                                onChange={(e) => setFriendPayId(e.target.value)}
                                placeholder="Enter 5-digit PayID"
                                maxLength={5}
                                className="w-full pl-10 pr-4 py-3 bg-muted rounded-xl font-mono tracking-widest text-lg focus:outline-none focus:ring-2 focus:ring-primary"
                            />
                        </div>

                        {addFriendMessage && (
                            <div className={`mb-4 p-3 rounded-xl text-sm ${addFriendMessage.includes("added")
                                    ? "bg-primary/10 text-primary"
                                    : "bg-destructive/10 text-destructive"
                                }`}>
                                {addFriendMessage}
                            </div>
                        )}

                        <button
                            onClick={addFriend}
                            disabled={!friendPayId.trim() || addingFriend}
                            className="w-full py-3 bg-primary text-primary-foreground rounded-xl font-medium hover:opacity-90 disabled:opacity-50"
                        >
                            {addingFriend ? "Adding..." : "Add Friend"}
                        </button>
                    </div>
                </div>
            )}

            <div className="bg-card border border-border rounded-3xl overflow-hidden grid grid-cols-1 md:grid-cols-3" style={{ height: '550px' }}>
                {/* Friend List */}
                <div className="border-r border-border overflow-y-auto">
                    <div className="p-4 border-b border-border bg-muted/50">
                        <h2 className="font-semibold text-sm">Friends ({friends.length})</h2>
                    </div>

                    {isLoadingFriends ? (
                        <div className="p-8 text-center">
                            <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-3"></div>
                            <p className="text-sm text-muted-foreground">Loading...</p>
                        </div>
                    ) : friends.length === 0 ? (
                        <div className="p-8 text-center">
                            <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                                <BiUser className="w-8 h-8 text-muted-foreground" />
                            </div>
                            <p className="text-sm text-muted-foreground">No friends yet</p>
                            <button
                                onClick={() => setShowAddFriend(true)}
                                className="text-primary text-sm hover:underline mt-2 inline-block"
                            >
                                Add your first friend
                            </button>
                        </div>
                    ) : (
                        <div className="divide-y divide-border">
                            {friends.map((friend) => (
                                <button
                                    key={friend.id}
                                    onClick={() => setSelectedFriend(friend)}
                                    className={`w-full p-4 flex items-center gap-3 hover:bg-accent transition-colors text-left ${selectedFriend?.id === friend.id ? 'bg-accent' : ''
                                        }`}
                                >
                                    <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center">
                                        <BiUser className="w-5 h-5 text-muted-foreground" />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className="font-medium truncate">{friend.name}</p>
                                        <p className="text-xs text-muted-foreground">ID: {friend.payId}</p>
                                    </div>
                                </button>
                            ))}
                        </div>
                    )}
                </div>

                {/* Chat Area */}
                <div className="md:col-span-2 flex flex-col">
                    {selectedFriend ? (
                        <>
                            {/* Chat Header */}
                            <div className="p-4 border-b border-border flex items-center justify-between bg-muted/30">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center">
                                        <BiUser className="w-5 h-5 text-muted-foreground" />
                                    </div>
                                    <div>
                                        <p className="font-semibold">{selectedFriend.name}</p>
                                        <p className="text-xs text-muted-foreground">PayID: {selectedFriend.payId}</p>
                                    </div>
                                </div>
                                <button
                                    onClick={() => setShowSendMoney(!showSendMoney)}
                                    disabled={sendingMoney}
                                    className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-xl text-sm font-medium hover:opacity-90 transition-opacity disabled:opacity-50"
                                >
                                    <BiDollar className="w-4 h-4" />
                                    Send Money
                                </button>
                            </div>

                            {/* Send Money Panel */}
                            {showSendMoney && (
                                <div className="p-4 bg-muted/50 border-b border-border">
                                    {moneySent ? (
                                        <div className="flex items-center gap-3 text-primary">
                                            <BiCheckCircle className="w-5 h-5" />
                                            <span className="font-medium">Money sent successfully!</span>
                                        </div>
                                    ) : (
                                        <div className="flex gap-3">
                                            <div className="flex-1 relative">
                                                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-primary font-bold">₹</span>
                                                <input
                                                    type="number"
                                                    value={amount}
                                                    onChange={(e) => setAmount(e.target.value)}
                                                    placeholder="Enter amount"
                                                    disabled={sendingMoney}
                                                    className="w-full pl-8 pr-4 py-3 bg-card border border-border rounded-xl focus:ring-2 focus:ring-primary disabled:opacity-50"
                                                />
                                            </div>
                                            <button
                                                onClick={sendMoney}
                                                disabled={!amount || sendingMoney}
                                                className="px-6 py-3 bg-primary text-primary-foreground rounded-xl font-medium hover:opacity-90 disabled:opacity-50"
                                            >
                                                {sendingMoney ? "Sending..." : "Send"}
                                            </button>
                                        </div>
                                    )}
                                </div>
                            )}

                            {/* Messages */}
                            <div className="flex-1 p-4 overflow-y-auto">
                                {messages.length === 0 ? (
                                    <div className="h-full flex items-center justify-center text-center">
                                        <div>
                                            <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                                                <BiMessageSquareDetail className="w-8 h-8 text-muted-foreground" />
                                            </div>
                                            <p className="text-muted-foreground">No messages yet</p>
                                            <p className="text-sm text-muted-foreground mt-1">Start the conversation or send money!</p>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="space-y-3">
                                        {messages.map((msg) => (
                                            <div key={msg.id} className={`flex ${msg.senderId === 'me' ? 'justify-end' : 'justify-start'}`}>
                                                <div className={`max-w-[70%] p-3 rounded-2xl ${msg.type === 'payment'
                                                    ? 'bg-primary text-primary-foreground'
                                                    : msg.senderId === 'me'
                                                        ? 'bg-primary text-primary-foreground'
                                                        : 'bg-muted'
                                                    }`}>
                                                    {msg.type === 'payment' && <p className="text-xs opacity-80 mb-1">💸 Payment</p>}
                                                    <p className="text-sm">{msg.text}</p>
                                                </div>
                                            </div>
                                        ))}
                                        <div ref={messagesEndRef} />
                                    </div>
                                )}
                            </div>

                            {/* Message Input */}
                            <div className="p-4 border-t border-border">
                                <div className="flex gap-3">
                                    <input
                                        type="text"
                                        value={newMessage}
                                        onChange={(e) => setNewMessage(e.target.value)}
                                        onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
                                        placeholder="Type a message..."
                                        className="flex-1 px-4 py-3 bg-muted rounded-xl focus:outline-none focus:ring-2 focus:ring-primary"
                                    />
                                    <button
                                        onClick={sendMessage}
                                        className="px-4 py-3 bg-primary text-primary-foreground rounded-xl hover:opacity-90 transition-opacity"
                                    >
                                        <BiSend className="w-5 h-5" />
                                    </button>
                                </div>
                            </div>
                        </>
                    ) : (
                        <div className="flex-1 flex items-center justify-center text-center">
                            <div>
                                <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                                    <BiMessageSquareDetail className="w-8 h-8 text-muted-foreground" />
                                </div>
                                <p className="text-lg font-medium">Select a conversation</p>
                                <p className="text-sm text-muted-foreground mt-1">Choose a friend to start chatting</p>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
