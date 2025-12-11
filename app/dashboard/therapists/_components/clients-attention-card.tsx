interface ClientAlert {
  id: string;
  name: string;
  status: string;
  statusType: "warning" | "error" | "info";
  avatarUrl?: string;
}

interface ClientsAttentionCardProps {
  clients: ClientAlert[];
}

export function ClientsAttentionCard({ clients }: ClientsAttentionCardProps) {
  const getStatusColor = (type: ClientAlert["statusType"]) => {
    switch (type) {
      case "warning":
        return "text-yellow-500";
      case "error":
        return "text-red-500";
      case "info":
        return "text-blue-500";
      default:
        return "text-slate-500";
    }
  };

  return (
    <div className="bg-white border border-slate-200 p-6 rounded-lg shadow-sm">
      <h2 className="text-slate-800 text-lg font-bold mb-4">
        Clients Requiring Attention
      </h2>
      <div className="flex flex-col gap-4">
        {clients.map((client) => (
          <div key={client.id} className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-slate-200 flex items-center justify-center text-slate-600 font-medium flex-shrink-0">
              {client.name.charAt(0)}
            </div>
            <div className="flex-grow">
              <p className="font-medium text-slate-800">{client.name}</p>
              <p className={`text-sm ${getStatusColor(client.statusType)}`}>
                {client.status}
              </p>
            </div>
            <button className="text-slate-500 hover:text-slate-800">
              <span className="text-xl">›</span>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
