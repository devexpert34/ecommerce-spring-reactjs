package com.gmail.merikbest2015.ecommerce.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.*;
import org.hibernate.validator.constraints.Length;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import java.util.List;

/**
 * The class describes the "Perfume" entity.
 * The @Entity annotation says that objects of this class will be processed by hibernate.
 * The @Getter and @Setter annotation generates getters and setters for all fields.
 * The @NoArgsConstructor annotation generates no-args constructor.
 * The @AllArgsConstructor annotation generates all args constructor.
 * The @EqualsAndHashCode annotation generates implementations for the {@code equals} and {@code hashCode} methods inherited
 * by all objects, based on relevant fields.
 *
 * @author Miroslav Khotinskiy (merikbest2015@gmail.com)
 * @version 1.0
 */
@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode(of = {"id", "perfumer", "perfumeTitle", "perfumeGender", "price"})
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
public class Perfume {
    /**
     * The unique code of the object.
     * The @Id annotation says that the field is the key for the current object.
     */
    @Id
    @GeneratedValue(strategy= GenerationType.AUTO)
    private Long id;

    /**
     * Perfume title.
     * The @NotBlank annotation says the field should not be empty.
     * Max length of perfume title field is 255 characters.
     */
    @NotBlank(message = "Fill in the input field")
    @Length(max = 255)
    private String perfumeTitle;

    /**
     * Perfume manufacturer.
     * The @NotBlank annotation says the field should not be empty.
     * Max length of perfume manufacturer field is 255 characters.
     */
    @NotBlank(message = "Fill in the input field")
    @Length(max = 255)
    private String perfumer;

    /**
     * The year the perfume was released.
     * The @NotBlank annotation says the field should not be empty.
     */
    @NotNull(message = "Fill in the input field")
    private Integer year;

    /**
     * Manufacturer country.
     * The @NotBlank annotation says the field should not be empty.
     * Max length of manufacturer country field is 255 characters.
     */
    @NotBlank(message = "Fill in the input field")
    @Length(max = 255)
    private String country;

    /**
     * Gender.
     * The @NotBlank annotation says the field should not be empty.
     * Max length of manufacturer country field is 255 characters.
     */
    @NotBlank(message = "Fill in the input field")
    @Length(max = 255)
    private String perfumeGender;

    /**
     * Fragrance top notes.
     * The @NotBlank annotation says the field should not be empty.
     * Max length of manufacturer country field is 255 characters.
     */
    @NotBlank(message = "Fill in the input field")
    @Length(max = 255)
    private String fragranceTopNotes;

    /**
     * Fragrance middle notes.
     * The @NotBlank annotation says the field should not be empty.
     * Max length of manufacturer country field is 255 characters.
     */
    @NotBlank(message = "Fill in the input field")
    @Length(max = 255)
    private String fragranceMiddleNotes;

    /**
     * Fragrance base notes.
     * The @NotBlank annotation says the field should not be empty.
     * Max length of manufacturer country field is 255 characters.
     */
    @NotBlank(message = "Fill in the input field")
    @Length(max = 255)
    private String fragranceBaseNotes;

    /**
     * Perfume description.
     */
    private String description;

    /**
     * Perfume image.
     */
    private String filename;

    /**
     * Perfume price.
     * The @NotBlank annotation says the field should not be empty.
     */
    @NotNull(message = "Fill in the input field")
    private Integer price;

    /**
     * Perfume volume.
     * The @NotBlank annotation says the field should not be empty.
     * Max length of manufacturer country field is 255 characters.
     */
    @NotBlank(message = "Fill in the input field")
    @Length(max = 255)
    private String volume;

    /**
     * Type of fragrance.
     * The @NotBlank annotation says the field should not be empty.
     * Max length of manufacturer country field is 255 characters.
     */
    @NotBlank(message = "Fill in the input field")
    @Length(max = 255)
    private String type;

    /**
     * List of reviews for current perfume.
     * Between the {@link Perfume} and {@link Review} objects, there is a one-to-many relationship, that is,
     * each record in one table is directly related to a single record in another table.
     */
    @OneToMany
    private List<Review> reviews;
}