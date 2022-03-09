package br.com.konatus.teste.service;

import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import br.com.konatus.teste.domain.User;

@Service
public class AuthenticationContext {

    public User getLoggedUser() {
        return (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
    }

    public Long getUserId() {
        return getLoggedUser().getId();
    }

    public String getUserLogin() {
        return getLoggedUser().getLogin();
    }
    
}
