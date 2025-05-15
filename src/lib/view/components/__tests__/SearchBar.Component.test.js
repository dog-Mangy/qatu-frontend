import { render, fireEvent, screen } from "@testing-library/svelte";
import SearchBar from "../SearchBar.svelte";
import { afterEach, beforeAll, beforeEach, describe, expect, it, vi } from 'vitest';

describe("SearchBar Component", () => {
    beforeAll(() => {
        global.console.log = vi.fn();
        global.alert = vi.fn();
    });

    afterEach(() => {
        vi.clearAllMocks();
    });

    it("should render correctly with default props", () => {
        render(SearchBar);

        const input = screen.getByPlaceholderText("Search..");
        const icon = screen.getByRole("button", { name: "Search" });

        expect(input).toBeInTheDocument();
        expect(icon).toBeInTheDocument();
        expect(input).toHaveValue("");
    });

    it("should update searchQuery when typing", async () => {
        render(SearchBar);
        const input = screen.getByPlaceholderText("Search..");

        await fireEvent.input(input, { target: { value: "test query" } });

        expect(input).toHaveValue("test query");
    });
});
