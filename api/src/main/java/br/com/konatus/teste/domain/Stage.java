package br.com.konatus.teste.domain;

import java.time.Instant;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import br.com.konatus.teste.domain.enums.StageType;
import lombok.Data;

@Entity
@Table(name = "stages")
@Data
public class Stage {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "stages_seq_id")
    @SequenceGenerator(name = "stages_seq_id", allocationSize = 1)
    private Long id;

    @NotNull
    @Column(nullable = false)
    private String description;

    @NotNull
    @Column(nullable = false)
    private Boolean status = true;

    @NotNull
    @Column(nullable = false)
    @Enumerated(EnumType.ORDINAL)
    private StageType type;

    @NotNull
    @Column(nullable = false)
    private String value;

    @NotNull
    @Column(name = "created_at", nullable = false)
    private Instant createdAt = Instant.now();

    @ManyToOne(optional = false)
    @NotNull
    @JsonIgnoreProperties(value = { "usuario" }, allowSetters = true)
    private Maintenance maintenance;
}