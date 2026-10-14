import { useQuery, useMutation } from "@tanstack/react-query"


export function createMessagesAPI(client) {

    /**
     * @description Creates a conversation with the given participants, optionally linked to a submission. If linked to a submission, only users with access to the submission can be added as participants. Endpoint: POST '/api/messages/conversations'
     * @param {Object} props 
     * @param {String[]} props.user_tags - The tags of the conversation participants (must include the creator).
     * @param {String} [props.submission_tag] - The tag of the submission the conversation is linked to.
     * @param {String} [props.title] - The title of the conversation.
     * @param {String} [props.initial_message] - An optional initial message.
     * @returns {String} The tag of the created conversation.
     */
    async function createConversation_API({ user_tags, submission_tag, title, initial_message }) {
        const res = await client.post(`/messages/conversations`, {
            user_tags, submission_tag, title, initial_message
        })
        return res.data
    }

    const usePostConversation = (useMutationOptions = {}) => {
        return useMutation({
            mutationFn: (APIParams) => createConversation_API({ ...APIParams }),
            ...useMutationOptions
        })
    }


    /**
     * @description Returns the conversations of the current user, optionally filtered by submission. Endpoint: GET '/api/messages/conversations'
     * @param {Object} props 
     * @param {String} [props.submission_tag] - The tag of the submission to filter the conversations by.
     * @returns {Object[]} The conversations (tag, created_at, created_by, user_tags, submission_tag, title, last_message_at, n_messages, unread, last_message).
     */
    async function getMyConversations_API({ submission_tag }) {
        const res = await client.get(`/messages/conversations`, {
            params: { submission_tag }
        })
        return res.data
    }

    const useGetMyConversations = (APIParams = {}, useQueryOptions = { staleTime: 500 }) => {
        return useQuery({
            queryKey: ["getMyConversations", APIParams.submission_tag],
            queryFn: () => getMyConversations_API({ ...APIParams }),
            ...useQueryOptions
        });
    }


    /**
     * @description Returns a conversation by its tag. Requires participant or curator rights. Endpoint: GET '/api/messages/conversations/{conversation_tag}'
     * @param {Object} props 
     * @param {String} props.conversation_tag - The tag of the conversation.
     * @returns {Object} The conversation (tag, created_at, created_by, user_tags, submission_tag, title).
     */
    async function getConversation_API({ conversation_tag }) {
        const res = await client.get(`/messages/conversations/${conversation_tag}`)
        return res.data
    }

    const useGetConversation = (APIParams = { conversation_tag }, useQueryOptions = { staleTime: 500 }) => {
        return useQuery({
            queryKey: ["getConversation", APIParams.conversation_tag],
            queryFn: () => getConversation_API({ ...APIParams }),
            ...useQueryOptions
        });
    }


    /**
     * @description Returns the messages of a conversation and marks the conversation as read for the current user. Requires participant rights. Endpoint: GET '/api/messages/conversations/{conversation_tag}/messages'
     * @param {Object} props 
     * @param {String} props.conversation_tag - The tag of the conversation.
     * @param {Number} [props.limit] - The limit of messages to return.
     * @returns {Object[]} The messages (tag, created_at, sender_tag, content, read_by).
     */
    async function getConversationMessages_API({ conversation_tag, limit }) {
        const res = await client.get(`/messages/conversations/${conversation_tag}/messages`, {
            params: { limit }
        })
        return res.data
    }

    const useGetConversationMessages = (APIParams = { conversation_tag }, useQueryOptions = { staleTime: 500 }) => {
        return useQuery({
            queryKey: ["getConversationMessages", APIParams.conversation_tag, APIParams.limit],
            queryFn: () => getConversationMessages_API({ ...APIParams }),
            ...useQueryOptions
        });
    }


    /**
     * @description Adds a message to a conversation. Requires participant rights. Endpoint: POST '/api/messages/conversations/{conversation_tag}/messages'
     * @param {Object} props 
     * @param {String} props.conversation_tag - The tag of the conversation.
     * @param {String} props.content - The content of the message.
     * @returns {String} The tag of the created message.
     */
    async function createConversationMessage_API({ conversation_tag, content }) {
        const res = await client.post(`/messages/conversations/${conversation_tag}/messages`, {
            content
        })
        return res.data
    }

    const usePostConversationMessage = (useMutationOptions = {}) => {
        return useMutation({
            mutationFn: (APIParams) => createConversationMessage_API({ ...APIParams }),
            ...useMutationOptions
        })
    }


    /**
     * @description Marks the conversation as read for the current user. Requires participant rights. Endpoint: POST '/api/messages/conversations/{conversation_tag}/read'
     * @param {Object} props 
     * @param {String} props.conversation_tag - The tag of the conversation.
     * @returns {Boolean} True if the conversation was marked as read.
     */
    async function markConversationRead_API({ conversation_tag }) {
        const res = await client.post(`/messages/conversations/${conversation_tag}/read`, {})
        return res.data
    }

    const usePostMarkConversationRead = (useMutationOptions = {}) => {
        return useMutation({
            mutationFn: (APIParams) => markConversationRead_API({ ...APIParams }),
            ...useMutationOptions
        })
    }


    /**
     * @description Returns the number of unread messages of a conversation for the current user. Requires participant rights. Endpoint: GET '/api/messages/conversations/{conversation_tag}/unread'
     * @param {Object} props 
     * @param {String} props.conversation_tag - The tag of the conversation.
     * @returns {Number} The number of unread messages.
     */
    async function getConversationUnreadCount_API({ conversation_tag }) {
        const res = await client.get(`/messages/conversations/${conversation_tag}/unread`)
        return res.data
    }

    const useGetConversationUnreadCount = (APIParams = { conversation_tag }, useQueryOptions = { staleTime: 500 }) => {
        return useQuery({
            queryKey: ["getConversationUnreadCount", APIParams.conversation_tag],
            queryFn: () => getConversationUnreadCount_API({ ...APIParams }),
            ...useQueryOptions
        });
    }


    /**
     * @description Returns the conversations linked to a submission. Requires submission access. Endpoint: GET '/api/messages/submissions/{submission_tag}/conversations'
     * @param {Object} props 
     * @param {String} props.submission_tag - The tag of the submission.
     * @returns {Object[]} The conversations linked to the submission.
     */
    async function getSubmissionConversations_API({ submission_tag }) {
        const res = await client.get(`/messages/submissions/${submission_tag}/conversations`)
        return res.data
    }

    const useGetSubmissionConversations = (APIParams = { submission_tag }, useQueryOptions = { staleTime: 500 }) => {
        return useQuery({
            queryKey: ["getSubmissionConversations", APIParams.submission_tag],
            queryFn: () => getSubmissionConversations_API({ ...APIParams }),
            ...useQueryOptions
        });
    }


    return {
        usePostConversation,
        useGetMyConversations,
        useGetConversation,
        useGetConversationMessages,
        usePostConversationMessage,
        usePostMarkConversationRead,
        useGetConversationUnreadCount,
        useGetSubmissionConversations
    };
}
