package br.com.konatus.teste.domain.dto;

import br.com.konatus.teste.domain.Stage;
import br.com.konatus.teste.domain.enums.StageType;
import lombok.Getter;

@Getter
public class StageDTO {

    private final Long id;
    private final String description;
    private final Boolean status;
    private final StageType type;
    private final String value;

    public StageDTO(Stage stage) {
        this.id = stage.getId();
        this.description = stage.getDescription();
        this.status = stage.getStatus();
        this.type = stage.getType();
        this.value = stage.getValue();
   }
}
