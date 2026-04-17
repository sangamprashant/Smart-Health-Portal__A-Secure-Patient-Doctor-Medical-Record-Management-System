import { useEffect, useRef, useState } from "react";
import { Avatar, List, notification } from "antd";
import _env from "../../utils/_env";
import { useAuth } from "../../providers/AuthContext";

type Contact = {
  _id: string;
  fullName: string;
  role: "doctor" | "patient" | "admin";
  email?: string;
  patientId?: string;
  profile_image?: string;
};

type Message = {
  _id: string;
  senderId: Contact;
  receiverId: Contact;
  text: string;
  createdAt: string;
};

const Messages = () => {
  const { user, token } = useAuth();
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const bottomRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    const fetchContacts = async () => {
      if (!token) return;

      try {
        const res = await fetch(`${_env.SERVER_URL}/chat/contacts`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();

        if (!res.ok) throw new Error(data.message || "Failed to load contacts");

        setContacts(data);
        if (data[0]?._id) setSelectedContact(data[0]);
      } catch (err) {
        notification.error({
          message: err instanceof Error ? err.message : "Failed to load contacts",
        });
      }
    };

    fetchContacts();
  }, [token]);

  const fetchMessages = async (contactId: string) => {
    if (!token) return;

    try {
      const res = await fetch(`${_env.SERVER_URL}/chat/${contactId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();

      if (!res.ok) throw new Error(data.message || "Failed to load messages");

      setMessages(data);
    } catch (err) {
      notification.error({
        message: err instanceof Error ? err.message : "Failed to load messages",
      });
    }
  };

  useEffect(() => {
    if (selectedContact) fetchMessages(selectedContact._id);
  }, [selectedContact?._id, token]);

  const handleSend = async () => {
    if (!token || !selectedContact || !input.trim()) return;

    try {
      const res = await fetch(`${_env.SERVER_URL}/chat`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ receiverId: selectedContact._id, text: input }),
      });
      const data = await res.json();

      if (!res.ok) throw new Error(data.message || "Failed to send message");

      setMessages((prev) => [...prev, data]);
      setInput("");
    } catch (err) {
      notification.error({
        message: err instanceof Error ? err.message : "Failed to send message",
      });
    }
  };

  return (
    <div className="grid h-[80vh] gap-4 p-4 lg:grid-cols-[300px_1fr]">
      <div className="overflow-hidden rounded-lg border bg-white">
        <div className="border-b p-3 font-semibold">Contacts</div>
        <List
          dataSource={contacts}
          locale={{ emptyText: "No contacts found" }}
          renderItem={(contact) => (
            <List.Item
              className={`cursor-pointer px-3 ${selectedContact?._id === contact._id ? "bg-blue-50" : ""}`}
              onClick={() => setSelectedContact(contact)}
            >
              <List.Item.Meta
                avatar={<Avatar src={contact.profile_image}>{contact.fullName[0]}</Avatar>}
                title={contact.fullName}
                description={contact.role === "patient" ? contact.patientId : contact.email}
              />
            </List.Item>
          )}
        />
      </div>

      <div className="flex min-h-0 flex-col overflow-hidden rounded-lg border bg-white">
        <div className="border-b bg-gray-100 p-3 font-semibold">
          {selectedContact ? selectedContact.fullName : "Select a contact"}
        </div>

        <div className="flex-1 space-y-3 overflow-y-auto bg-gray-50 p-3">
          {messages.map((msg) => {
            const senderId = typeof msg.senderId === "string" ? msg.senderId : msg.senderId._id;
            const isMe = senderId === user?._id;

            return (
              <div key={msg._id} className={`flex ${isMe ? "justify-end" : "justify-start"}`}>
                <div className={`max-w-xs rounded-lg p-2 text-sm ${isMe ? "bg-blue-600 text-white" : "border bg-white"}`}>
                  <p>{msg.text}</p>
                  <span className="block text-right text-[10px] opacity-70">
                    {new Date(msg.createdAt).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                  </span>
                </div>
              </div>
            );
          })}
          <div ref={bottomRef} />
        </div>

        <div className="flex gap-2 border-t p-3">
          <input
            type="text"
            className="flex-1 rounded border px-3 py-2"
            placeholder="Type a message..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
            disabled={!selectedContact}
          />
          <button
            onClick={handleSend}
            className="rounded bg-blue-600 px-4 text-white disabled:opacity-60"
            disabled={!selectedContact || !input.trim()}
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default Messages;
