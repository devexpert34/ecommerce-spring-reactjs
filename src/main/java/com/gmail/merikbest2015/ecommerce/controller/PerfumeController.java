package com.gmail.merikbest2015.ecommerce.controller;

import com.gmail.merikbest2015.ecommerce.dto.GraphQLRequestDto;
import com.gmail.merikbest2015.ecommerce.dto.perfume.PerfumeResponseDto;
import com.gmail.merikbest2015.ecommerce.dto.perfume.PerfumeSearchRequestDto;
import com.gmail.merikbest2015.ecommerce.mapper.PerfumeMapper;
import graphql.ExecutionResult;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/perfumes")
public class PerfumeController {

    private final PerfumeMapper perfumeMapper;

    @GetMapping
    public ResponseEntity<List<PerfumeResponseDto>> getAllPerfumes() {
        return ResponseEntity.ok(perfumeMapper.findAllPerfumes());
    }

    @GetMapping("/{id}")
    public ResponseEntity<PerfumeResponseDto> getPerfume(@PathVariable("id") Long perfumeId) {
        return ResponseEntity.ok(perfumeMapper.findPerfumeById(perfumeId));
    }

    @PostMapping("/search")
    public ResponseEntity<List<PerfumeResponseDto>> findPerfumesByFilterParams(@RequestBody PerfumeSearchRequestDto filter) {
        return ResponseEntity.ok(perfumeMapper.filter(filter.getPerfumers(), filter.getGenders(), filter.getPrices()));
    }

    @PostMapping("/search/gender")
    public ResponseEntity<List<PerfumeResponseDto>> findByPerfumeGender(@RequestBody PerfumeSearchRequestDto filter) {
        return ResponseEntity.ok(perfumeMapper.findByPerfumeGenderOrderByPriceDesc(filter.getPerfumeGender()));
    }

    @PostMapping("/search/perfumer")
    public ResponseEntity<List<PerfumeResponseDto>> findByPerfumer(@RequestBody PerfumeSearchRequestDto filter) {
        return ResponseEntity.ok(perfumeMapper.findByPerfumerOrderByPriceDesc(filter.getPerfumer()));
    }

    @PostMapping("/graphql/perfumes")
    public ResponseEntity<ExecutionResult> getAllPerfumesByQuery(@RequestBody GraphQLRequestDto request) {
        return ResponseEntity.ok(perfumeMapper.getAllPerfumesByQuery(request.getQuery()));
    }

    @PostMapping("/graphql/perfume")
    public ResponseEntity<ExecutionResult> getPerfumeByQuery(@RequestBody GraphQLRequestDto request) {
        return ResponseEntity.ok(perfumeMapper.getPerfumeByQuery(request.getQuery()));
    }
}
