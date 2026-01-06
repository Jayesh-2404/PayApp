"use client";

import { useState, useEffect, useRef } from "react";
import { BiMessageSquareDetail, BiSend, BiPlus, BiDollar, BiUser, BiCheckCircle } from "react-icons/bi";
import Link from "next/link";

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
    const messagesEndRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        fetch("/api/friends")
            .then(res => res.json())
            .then(data => {
                if (Array.isArray(data)) setFriends(data);
            });
    }, []);

    const sendMoney = async () => {
        if (!selectedFriend || !amount) return;

        setSendingMoney(true);

        try {
            const res = await fetch("/api/transfer", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    receiverPayId: selectedFriend.payId,
                    amount: parseFloat(amount)
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
                }, 2000);
            }
        } catch (err) {
            console.error(err);
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
                <Link
                    href="/friends/add"
                    className="flex items-center gap-2 px-4 py-2.5 bg-primary text-primary-foreground rounded-xl text-sm font-medium hover:opacity-90 transition-opacity"
                >
                    <BiPlus className="w-4 h-4" />
                    Add Friend
                </Link>
            </div>

            <div className="bg-card border border-border rounded-3xl overflow-hidden grid grid-cols-1 md:grid-cols-3" style={{ height: '550px' }}>
                {/* Friend List */}
                <div className="border-r border-border overflow-y-auto">
                    <div className="p-4 border-b border-border bg-muted/50">
                        <h2 className="font-semibold text-sm">Friends ({friends.length})</h2>
                    </div>

                    {friends.length === 0 ? (
                        <div className="p-8 text-center">
                            <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                                <BiUser className="w-8 h-8 text-muted-foreground" />
                            </div>
                            <p className="text-sm text-muted-foreground">No friends yet</p>
                            <Link href="/friends/add" className="text-primary text-sm hover:underline mt-2 inline-block">
                                Add your first friend
                            </Link>
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
                                    className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-xl text-sm font-medium hover:opacity-90 transition-opacity"
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
                                                    className="w-full pl-8 pr-4 py-3 bg-card border border-border rounded-xl focus:ring-2 focus:ring-primary"
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
