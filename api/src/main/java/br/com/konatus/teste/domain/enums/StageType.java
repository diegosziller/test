package br.com.konatus.teste.domain.enums;

public enum StageType {
    TEXT(1), NUMBER(2), PHOTO(3);

    StageType(int value) {
        this.value = value;
    }

    private int value;

    public int getValue() {
        return value;
    }
}