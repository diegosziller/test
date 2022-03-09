package br.com.konatus.teste.domain.dto;

import br.com.konatus.teste.domain.User;
import lombok.Getter;

@Getter
public class UserDTO {

    private final Long id;
    private final String login;

    public UserDTO(User user) {
        this.id = user.getId();
        this.login = user.getLogin();
    }
}
