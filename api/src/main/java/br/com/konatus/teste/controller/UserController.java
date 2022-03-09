package br.com.konatus.teste.controller;

import java.util.List;
import java.util.Objects;

import javax.validation.Valid;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

import br.com.konatus.teste.domain.User;
import br.com.konatus.teste.domain.dto.UserDTO;
import br.com.konatus.teste.domain.exception.NotFoundException;
import br.com.konatus.teste.repository.UserRepository;
import br.com.konatus.teste.service.UserService;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;
    private final UserRepository userRepository;

    @GetMapping("/users")
    public ResponseEntity<List<User>> getAllUsers(Pageable pageable) {
        Page<User> page = userService.findAll(pageable);
        return ResponseEntity.ok().body(page.getContent());
    }

    @GetMapping("/users/{id}")
    public ResponseEntity<UserDTO> getUser(@PathVariable Long id) {
        User user = userService.findOne(id)
                .orElseThrow(() -> new NotFoundException(User.class, id));

        return ResponseEntity.ok().body(new UserDTO(user));
    }

    @PutMapping("/users/{id}")
    public ResponseEntity<UserDTO> updateUser(
            @PathVariable(value = "id", required = false) final Long id,
            @Valid @RequestBody User user) {
        if (user.getId() == null) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "ID não pode ser nulo.");
        }
        if (!Objects.equals(id, user.getId())) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "ID inválido.");
        }
        if (!userRepository.existsById(id)) {
            throw new NotFoundException(User.class, id);
        }

        User result = userService.save(user);
        return ResponseEntity.ok().body(new UserDTO(result));
    }

    @DeleteMapping("/users/{id}")
    public ResponseEntity<Void> deleteUser(@PathVariable Long id) {
        userService.delete(id);
        return ResponseEntity.noContent().build();
    }
}