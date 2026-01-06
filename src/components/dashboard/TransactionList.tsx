import { FiMoreHorizontal } from "react-icons/fi";

const transactions = [
    { id: 1, name: "Brandon Jackoby", type: "Friends and family investment", amount: 10000, date: "Pending", userImg: "https://i.pravatar.cc/150?u=1" },
    { id: 2, name: "Jackline Jordan", type: "Friends and family investment", amount: 26000, date: "Pending", userImg: "https://i.pravatar.cc/150?u=2" },
    { id: 3, name: "Olivia Emma", type: "We transfer for september end", amount: 12000, date: "Completed", userImg: "https://i.pravatar.cc/150?u=3" },
];

export function TransactionList({ title = "Transactions", type = "all" }: { title?: string, type?: "pending" | "completed" | "all" }) {
    // Filter logic can be added here

    return (
        <div className="bg-card text-card-foreground p-6 rounded-2xl border border-border shadow-sm h-full">
            <div className="flex justify-between items-center mb-6">
                <h3 className="font-semibold text-lg">{title}</h3>
                <button className="text-muted-foreground hover:text-foreground">
                    <FiMoreHorizontal />
                </button>
            </div>

            <div className="space-y-6">
                {transactions.map((tx) => (
                    <div key={tx.id} className="flex items-center justify-between group">
                        <div className="flex items-center gap-4">
                            <img src={tx.userImg} alt={tx.name} className="w-10 h-10 rounded-full object-cover" />
                            <div>
                                <p className="font-medium text-sm group-hover:text-primary transition-colors">{tx.name}</p>
                                <p className="text-xs text-muted-foreground">{tx.type}</p>
                            </div>
                        </div>
                        <div className="text-right">
                            <p className="font-bold text-sm text-green-500">+${tx.amount.toLocaleString()}</p>
                            {/* <p className="text-xs text-muted-foreground">{tx.date}</p> */}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
