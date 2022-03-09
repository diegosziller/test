package br.com.konatus.teste.service;

import java.time.Instant;
import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import br.com.konatus.teste.domain.User;
import br.com.konatus.teste.domain.dto.SignupDTO;
import br.com.konatus.teste.domain.exception.AlreadyExistsException;
import br.com.konatus.teste.domain.exception.NotFoundException;
import br.com.konatus.teste.repository.UserRepository;
import lombok.RequiredArgsConstructor;

@Service
@Transactional
@RequiredArgsConstructor
public class UserService implements UserDetailsService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    @Transactional(readOnly = true)
    public Page<User> findAll(Pageable pageable) {
        return userRepository.findAll(pageable);
    }

    @Transactional(readOnly = true)
    public Optional<User> findOne(Long id) {
        return userRepository.findById(id);
    }

    public User save(User user) {
        return userRepository.save(user);
    }

    public void delete(Long id) {
        userRepository.deleteById(id);
    }

    public User signUp(SignupDTO signupDTO) {
        userRepository.findOneByLogin(signupDTO.getLogin().toLowerCase())
                .ifPresent(existingUser -> {
                    throw new AlreadyExistsException("Usuário já existe");
                });

        User newUser = new User();
        String encryptedPassword = passwordEncoder.encode(signupDTO.getPassword());
        newUser.setLogin(signupDTO.getLogin().toLowerCase());
        newUser.setPassword(encryptedPassword);
        newUser.setCreatedAt(Instant.now());
        userRepository.save(newUser);
        return newUser;
	}

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        return userRepository.findOneByLogin(username)
                .orElseThrow(() -> new NotFoundException("Usuário não encontrado"));
    }

}
