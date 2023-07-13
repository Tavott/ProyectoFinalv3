import ticketModel from "./models/ticket.js";

export class TicketManager{
    async  createTicket(purchase_datetime, amount, purchaser){
        try {
            return await ticketModel.create({purchase_datetime, amount, purchaser})
        } catch (error) {
            console.log(error);
        }
    }
}