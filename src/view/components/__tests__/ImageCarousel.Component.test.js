import { render, fireEvent, screen } from "@testing-library/svelte";
import Carousel from "../ImageCarousel.Component.svelte";
import { vi } from "vitest";

describe("Carousel Component", () => {
    const mockImages = [
        "image1.jpg",
        "image2.jpg",
        "image3.jpg",
        "image4.jpg",
        "image5.jpg",
    ];

    const originalInnerWidth = window.innerWidth;
    const originalAddEventListener = window.addEventListener;
    const originalRemoveEventListener = window.removeEventListener;

    beforeEach(() => {
        window.addEventListener = vi.fn();
        window.removeEventListener = vi.fn();
        vi.clearAllMocks();
    });

    afterEach(() => {
        window.innerWidth = originalInnerWidth;
        window.addEventListener = originalAddEventListener;
        window.removeEventListener = originalRemoveEventListener;
    });

    it("should render with default number of images", () => {
        render(Carousel, {
            props: {
                containerId: "test-carousel",
                images: mockImages,
            },
        });

        const images = screen.getAllByRole("img");
        expect(images.length).toBe(mockImages.length);
    });

    it("should navigate correctly when clicking buttons", async () => {
        render(Carousel, {
            props: {
                containerId: "test-carousel",
                images: mockImages,
            },
        });

        const nextButton = screen.getByText("❯");
        const prevButton = screen.getByText("❮");

        let images = screen.getAllByRole("img");
        expect(images[0]).toHaveAttribute("alt", "Imagen 1");

        await fireEvent.click(nextButton);
        images = screen.getAllByRole("img");
        expect(images[0]).toHaveAttribute("alt", "Imagen 2");

        await fireEvent.click(prevButton);
        images = screen.getAllByRole("img");
        expect(images[0]).toHaveAttribute("alt", "Imagen 1");
    });
});
