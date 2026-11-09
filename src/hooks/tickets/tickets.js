import { useQuery, useMutation } from "@tanstack/react-query"


export function createTicketsAPI(client) {

    /**
     * @description Creates a support ticket from the contact form. No conversation is created until an admin replies. Endpoint: POST '/api/tickets'
     * @param {Object} props 
     * @param {String} props.title - The subject of the ticket.
     * @param {String} props.description - The message describing the issue.
     * @returns {Object} The created ticket (tag, reference).
     */
    async function createTicket_API({ title, description }) {
        const res = await client.post(`/tickets`, {
            title, description
        })
        return res.data
    }

    const usePostTicket = (useMutationOptions = {}) => {
        return useMutation({
            mutationFn: (APIParams) => createTicket_API({ ...APIParams }),
            ...useMutationOptions
        })
    }


    /**
     * @description Returns the tickets raised by the current user. Endpoint: GET '/api/tickets/mine'
     * @returns {Object[]} The tickets (tag, reference, title, description, status, created_at, updated_at, raised_by, conversation_tag, last_message_at, awaiting_reply).
     */
    async function getMyTickets_API() {
        const res = await client.get(`/tickets/mine`)
        return res.data
    }

    const useGetMyTickets = (useQueryOptions = { staleTime: 500 }) => {
        return useQuery({
            queryKey: ["getMyTickets"],
            queryFn: () => getMyTickets_API(),
            ...useQueryOptions
        });
    }


    /**
     * @description Returns the ticket queue, optionally filtered by status. Admins only. Endpoint: GET '/api/tickets'
     * @param {Object} props 
     * @param {String} [props.status] - Filter by status ('Open', 'In Progress', 'Resolved').
     * @returns {Object[]} The tickets, tickets awaiting a reply first.
     */
    async function getTicketQueue_API({ status }) {
        const res = await client.get(`/tickets`, {
            params: { status }
        })
        return res.data
    }

    const useGetTicketQueue = (APIParams = {}, useQueryOptions = { staleTime: 500, refetchInterval: 60000 }) => {
        return useQuery({
            queryKey: ["getTicketQueue", APIParams.status],
            queryFn: () => getTicketQueue_API({ ...APIParams }),
            ...useQueryOptions
        });
    }


    /**
     * @description Returns a ticket by its tag. Requires admin rights or being the ticket raiser. Endpoint: GET '/api/tickets/{ticket_tag}'
     * @param {Object} props 
     * @param {String} props.ticket_tag - The tag of the ticket.
     * @returns {Object} The ticket.
     */
    async function getTicket_API({ ticket_tag }) {
        const res = await client.get(`/tickets/${ticket_tag}`)
        return res.data
    }

    const useGetTicket = (APIParams = { ticket_tag }, useQueryOptions = { staleTime: 500 }) => {
        return useQuery({
            queryKey: ["getTicket", APIParams.ticket_tag],
            queryFn: () => getTicket_API({ ...APIParams }),
            enabled: !!APIParams.ticket_tag,
            ...useQueryOptions
        });
    }


    /**
     * @description Replies to a ticket and/or updates its status. Admins only. The first reply creates the conversation with the user (including their original request); later replies are added to it. Endpoint: POST '/api/tickets/{ticket_tag}/reply'
     * @param {Object} props 
     * @param {String} props.ticket_tag - The tag of the ticket.
     * @param {String} [props.content] - The reply text. Empty updates the status only.
     * @param {String} props.status - The new status ('Open', 'In Progress', 'Resolved').
     * @returns {Object} The updated ticket (incl. conversation_tag).
     */
    async function replyToTicket_API({ ticket_tag, content = "", resolve = false }) {
        const res = await client.post(`/tickets/${ticket_tag}/reply`, {
            content, resolve
        })
        return res.data
    }

    const usePostTicketReply = (useMutationOptions = {}) => {
        return useMutation({
            mutationFn: (APIParams) => replyToTicket_API({ ...APIParams }),
            ...useMutationOptions
        })
    }


    return {
        usePostTicket,
        useGetMyTickets,
        useGetTicketQueue,
        useGetTicket,
        usePostTicketReply
    };
}