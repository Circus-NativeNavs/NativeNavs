package com.nativenavs.tour.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class GuideTourDTO {
    private int tourId;
    private String thumbnailImage;
    private int reservationCount;
    private int wishedCount;
    private String title;
    private boolean isRemoved;
    private LocalDate startDate;
    private LocalDate endDate;

}
