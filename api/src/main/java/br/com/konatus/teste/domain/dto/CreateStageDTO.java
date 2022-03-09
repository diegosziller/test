package br.com.konatus.teste.domain.dto;

import javax.validation.constraints.NotBlank;

import lombok.Getter;

@Getter
public class CreateStageDTO {

    @NotBlank
    private String value;
    
}
