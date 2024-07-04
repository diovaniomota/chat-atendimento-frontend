import { SignInData, SignUpData } from "@/lib/schemas/authSchema";
import { api } from "./api";
import { APISignIn, APISignUp } from "@/Types/Auth";
import { APIUpdateUser } from '../Types/User';
import { APICreateChat, APIDeleteChat, APIGetChats } from "@/Types/Chat";
import { NewChatData } from "@/lib/schemas/chatSchema";
import { APICreateMessage, APIDeleteMessage, APIGetMessages } from "@/Types/Message";
//  auth / user
export const signIn = async (data: SignInData) => {
    return await api <APISignIn> ({
        endpoint: 'accounts/signin',
        method: 'POST',
        withAuth: false,
        data
    })
}

export const signUp = async (data: SignUpData) => {
    return await api <APISignUp> ({
        endpoint: 'accounts/signup',
        method: 'POST',
        withAuth: false,
        data
    })    
}

export const updateUser = async (data: FormData) => {
    return await api<APIUpdateUser>({
        endpoint: 'accounts/me',
        method: 'PUT',
        data, 
        withAttachment: true
    })
}

// chat

export const getChats = async () => {
    return await api <APIGetChats> ({
        endpoint: 'chats/'
    })
}

// create chat

export const createChat = async (data: NewChatData) => {
    return await api<APICreateChat>({
        endpoint: 'chats/',
        method: 'POST',
        data
    })
}

export const deleteChat = async (chat_id: number) => {
    return await api<APIDeleteChat>({
        endpoint: `chats/${chat_id}`,
        method: 'DELETE',
    })
}


export const getChatMessages = async (chat_id: number) => {
    return await api<APIGetMessages>({
        endpoint: `chats/${chat_id}/messages`
    })
}

export const createChatMessage = async (chat_id: number, data: FormData) => {
    return await api<APICreateMessage>({
        endpoint: `chats/${chat_id}/messages`,
        method: 'POST',
        data,
        withAttachment: true
    })
}

export const deleteChatMessage = async (chat_id: number, message_id: number) => {
    return await api<APIDeleteMessage>({
        endpoint: `chats/${chat_id}/messages/${message_id}`,
        method: 'DELETE'
    })
}


