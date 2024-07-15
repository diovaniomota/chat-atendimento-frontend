import { getChats } from "@/lib/requests"
import { useAuthStore } from "@/stores/authStore"
import { useChatStore } from "@/stores/chatStore"
import { Chat, UpdateChatEvent } from "@/Types/Chat"
import { useEffect, useState } from "react"
import { toast } from "sonner"
import { socket } from "../Providers"

type Props = {
    variant?: "mobile" | "desktop"
}

export const LeftSide = ({ variant = "desktop" }: Props) => {
    const { chat: currentChat, chats, setChats, setChat, setShowNewChat } = useChatStore()
    const { user } = useAuthStore()

    const [queryInput, setQueryInput] = useState('')
    const [chatsFiltered, setChatsFiltered] = useState<Chat[]>([])

    const handleGetChats = async () => {
        const response = await getChats()

        if (response.data) {
            setChats(response.data.chats)
        }
    }

    const handleFilterChats = () => {
        if (!chats) return;

        setChatsFiltered(chats.filter(chat => chat.unser.name.toLowerCase().includes(queryInput.toLowerCase())))
    }

    useEffect(() => {
        handleGetChats()
    }, [])

    useEffect(() => {
        if (!queryInput && chats) setChatsFiltered(chats)
    }, [queryInput, chats])

    useEffect(() => {
        const handleUpdateChat = (data: UpdateChatEvent) => {
            if (user && data.query.users.includes(user.id)) {
                handleGetChats()
            }

            if (data.type === "delete" && data.query.chat_id === currentChat?.id) {
                setChat(null)
                toast.info('A conversa foi deletada', { position: "top-center" })
            }
        }

        socket.on('update_chat', handleUpdateChat);

        return () => {
            socket.off('update_chat', handleUpdateChat);
        }
    }, [currentChat, user])

}
