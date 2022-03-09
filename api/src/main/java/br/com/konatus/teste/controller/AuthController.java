package br.com.konatus.teste.controller;

import javax.validation.Valid;

import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import br.com.konatus.teste.configuration.security.TokenProvider;
import br.com.konatus.teste.domain.User;
import br.com.konatus.teste.domain.dto.SignInDTO;
import br.com.konatus.teste.domain.dto.UserDTO;
import br.com.konatus.teste.domain.exception.NotFoundException;
import br.com.konatus.teste.service.UserService;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("api/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthenticationManager authenticationManager;
    private final TokenProvider tokenProvider;
    private final UserService userService;

    @PostMapping("/signin")
    public ResponseEntity<UserDTO> signIn(@Valid @RequestBody SignInDTO signInDTO) {
        try {
            Authentication authenticate = authenticationManager
                    .authenticate(new UsernamePasswordAuthenticationToken(signInDTO.getLogin(), signInDTO.getPassword()));

            User user = (User) authenticate.getPrincipal();

            return ResponseEntity.ok()
                    .header(HttpHeaders.ACCESS_CONTROL_EXPOSE_HEADERS, HttpHeaders.AUTHORIZATION)
                    .header(HttpHeaders.ACCESS_CONTROL_ALLOW_HEADERS, HttpHeaders.AUTHORIZATION)
                    .header(HttpHeaders.AUTHORIZATION, tokenProvider.createToken(user.getId()))
                    .body(new UserDTO(user));
        } catch (BadCredentialsException ex) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
    }

    @GetMapping("/user")
    public ResponseEntity<UserDTO> user(@RequestHeader("Authorization") String authorization) {
        Long userId = tokenProvider.extractUserId(authorization.substring(6).trim());
        User user =  userService.findOne(userId)
            .orElseThrow(() -> new NotFoundException(User.class, userId));
        return ResponseEntity.ok(new UserDTO(user));
    }
    
}
