import { Chat } from "@/Types/Chat"
import { Message } from "@/Types/Message"
import create from 'zustand'  // Adicione essa linha para importar create

export type ChatState = {
    showNewChat: boolean,
    chats: Chat[] | null,
    chat: Chat | null,
    chatMessages: Message[] | null,
    loading: boolean,
    showChatsList: boolean  // Corrigido para boolean com minúscula
}

export type ChatActions = {
    setShowNewChat: (show: boolean) => void,
    setShowChatsList: (show: boolean) => void,  // Corrigido o nome da função
    setChat: (chat: Chat | null) => void,
    setChatMessages: (messages: Message[] | null) => void,
    setChats: (chats: Chat[] | null) => void,
    setLoading: (loading: boolean) => void
}

export type ChatStore = ChatState & ChatActions

export const useChatStore = create<ChatStore>((set, get) => ({
    showNewChat: false,
    chats: null,
    chat: null,
    chatMessages: null,
    loading: false,
    showChatsList: false,
    setShowNewChat: (show) => set({ showNewChat: show }),
    setShowChatsList: (show) => set({ showChatsList: show }),  // Corrigido o nome da função
    setChat: (chat) => chat?.id != get().chat?.id && set({ chat, chatMessages: null }),
    setChatMessages: (messages) => set({ chatMessages: messages }),
    setChats: (chats) => set({ chats }),
    setLoading: (loading) => set({ loading })
}))