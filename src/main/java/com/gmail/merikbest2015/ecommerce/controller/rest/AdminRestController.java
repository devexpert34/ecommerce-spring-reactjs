package com.gmail.merikbest2015.ecommerce.controller.rest;

import com.gmail.merikbest2015.ecommerce.domain.Perfume;
import com.gmail.merikbest2015.ecommerce.service.PerfumeService;
import com.gmail.merikbest2015.ecommerce.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.validation.Valid;
import java.io.File;
import java.io.IOException;
import java.util.Map;
import java.util.UUID;

@PreAuthorize("hasAuthority('ADMIN')")
@RestController
@RequestMapping("/api/v1/rest")
public class AdminRestController {

    @Value("${upload.path}")
    private String uploadPath;

    private final UserService userService;

    private final PerfumeService perfumeService;

    @Autowired
    public AdminRestController(UserService userService, PerfumeService perfumeService) {
        this.userService = userService;
        this.perfumeService = perfumeService;
    }

    @PostMapping(value = "/admin/add")
    public ResponseEntity<?> addPerfumeToBd(
            @Valid Perfume perfume,
            BindingResult bindingResult,
            @RequestPart(name = "file", required = false) MultipartFile file
    ) throws IOException {
        if (bindingResult.hasErrors()) {
            Map<String, String> errorsMap = ControllerUtils.getErrors(bindingResult);

            return new ResponseEntity<>(errorsMap, HttpStatus.BAD_REQUEST);
        } else {
            saveFile(perfume, file);

            Perfume savedPerfume = perfumeService.save(perfume);

            return ResponseEntity.ok(savedPerfume);
        }
    }

    @PostMapping(value = "/admin/edit")
    public ResponseEntity<?> saveEditedPerfume(
            @Valid Perfume perfume,
            BindingResult bindingResult,
            @RequestPart(name = "file", required = false) MultipartFile file
    ) throws IOException {
        if (bindingResult.hasErrors()) {
            Map<String, String> errorsMap = ControllerUtils.getErrors(bindingResult);

            return new ResponseEntity<>(errorsMap, HttpStatus.BAD_REQUEST);
        } else {
            saveFile(perfume, file);

            perfumeService.saveProductInfoById(perfume.getPerfumeTitle(), perfume.getPerfumer(), perfume.getYear(),
                    perfume.getCountry(), perfume.getPerfumeGender(), perfume.getFragranceTopNotes(), perfume.getFragranceMiddleNotes(),
                    perfume.getFragranceBaseNotes(), perfume.getDescription(), perfume.getFilename(), perfume.getPrice(),
                    perfume.getVolume(), perfume.getType(), perfume.getId());

            return ResponseEntity.ok("OK");
        }
    }

    private void saveFile(Perfume perfume, @RequestParam("file") MultipartFile file) throws IOException {
        if (file == null) {
            perfume.setFilename("empty.jpg");
        } else {
            File uploadDir = new File(uploadPath);

            if (!uploadDir.exists()) {
                uploadDir.mkdir();
            }
            String uuidFile = UUID.randomUUID().toString();
            String resultFilename = uuidFile + "." + file.getOriginalFilename();

            file.transferTo(new File(uploadPath + "/" + resultFilename));
            perfume.setFilename(resultFilename);
        }
    }
}
