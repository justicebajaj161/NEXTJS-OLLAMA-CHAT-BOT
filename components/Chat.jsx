'use client'

import { useState } from "react"

const Chat = () => {
    const [text, setText] = useState('');
    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!text.trim()) return;

        setLoading(true);

        // Add user message immediately
        setMessages((prev) => [...prev, { sender: 'user', text }]);

        try {
            const response = await fetch('http://localhost:11434/api/generate', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    prompt: text,
                    model: 'deepseek-r1',
                    stream: true
                }),
            });

            const reader = response.body.getReader();
            const decoder = new TextDecoder('utf-8');
            let completeResponse = '';

            while (true) {
                const { done, value } = await reader.read();
                if (done) break;

                const chunk = decoder.decode(value, { stream: true });
                const lines = chunk.split('\n').filter(line => line.trim() !== '');

                for (const line of lines) {
                    try {
                        const json = JSON.parse(line);
                        completeResponse += json.response;
                    } catch (err) {
                        console.error('Error parsing JSON:', err);
                    }
                }
            }

            // Typing effect
            let currentResponse = '';
            const typeLetterByLetter = (index) => {
                if (index < completeResponse.length) {
                    currentResponse += completeResponse[index];

                    // Update message array properly
                    setMessages((prev) => {
                        const lastMessage = prev[prev.length - 1];
                        if (lastMessage?.sender === 'bot') {
                            // Update the last bot message
                            return [...prev.slice(0, -1), { sender: 'bot', text: currentResponse }];
                        } else {
                            // Append new bot message
                            return [...prev, { sender: 'bot', text: currentResponse }];
                        }
                    });

                    setTimeout(() => typeLetterByLetter(index + 1), 20);
                } else {
                    setLoading(false);
                }
            };
            typeLetterByLetter(0);

        } catch (error) {
            console.error('Error fetching response:', error);
            setLoading(false);
        }

        setText('');
    };

    return (
        <div className="min-h-[calc(100vh-6rem)] flex flex-col justify-between p-4">
            {/* Chat Messages */}
            <div className="flex flex-col gap-4 overflow-auto h-[70vh] p-2">
                {messages.map((msg, index) => (
                    <div key={index} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                        <div
                            className={`p-3 rounded-lg max-w-[70%] shadow-md ${
                                msg.sender === 'user' ? 'bg-primary text-white' : 'bg-[#E5E7EB] text-black'
                            }`}
                        >
                            {msg.text}
                        </div>
                    </div>
                ))}
                {loading && (
                    <div className="flex justify-start">
                        <div className="p-3 rounded-lg max-w-[70%] bg-[#E5E7EB] text-black shadow-md">
                            Typing...
                        </div>
                    </div>
                )}
            </div>

            {/* Input Field */}
            <form className="w-full pt-4 flex items-center" onSubmit={handleSubmit}>
                <div className="flex w-full bg-white shadow-md p-2 rounded-lg">
                    <input
                        type="text"
                        required
                        className="input flex-grow w-full outline-none p-2 bg-transparent text-black placeholder-gray-500"
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                        placeholder="Ask AdityaAI..."
                    />
                    <button className="btn btn-primary ml-2 px-4 py-2 rounded-lg" type="submit">
                        Send
                    </button>
                </div>
            </form>
        </div>
    );
}

export default Chat;
