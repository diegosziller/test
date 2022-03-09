package br.com.konatus.teste.domain.dto;

import java.time.Instant;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public class MaintenanceDTO {

    private final String description;
    private final Boolean status;
    private final Instant createdAt;
}