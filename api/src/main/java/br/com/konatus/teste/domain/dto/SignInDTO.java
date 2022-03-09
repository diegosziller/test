package br.com.konatus.teste.domain.dto;

import javax.validation.constraints.NotBlank;

import lombok.Getter;

@Getter
public class SignInDTO {

    @NotBlank
    private String login;

    @NotBlank
    private String password;
}