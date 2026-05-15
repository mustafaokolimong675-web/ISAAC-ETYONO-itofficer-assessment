package com.enterprise.template.service;

import com.enterprise.template.dto.TicketDTO;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface TicketService {
    TicketDTO createTicket(TicketDTO ticketDTO);
    TicketDTO updateTicket(Long id, TicketDTO ticketDTO);
    TicketDTO getTicketById(Long id);
    Page<TicketDTO> getAllTickets(Pageable pageable);
    Page<TicketDTO> searchTickets(String searchTerm, Pageable pageable);
    void deleteTicket(Long id);
}
