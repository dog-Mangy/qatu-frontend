import { render, fireEvent, screen } from "@testing-library/svelte";
import Login from "../Login.Component.svelte";
import { vi } from "vitest";
import { authViewModel } from "../../../viewmodel/viewmodels/authViewModel";

vi.mock("svelte-routing", () => ({
    navigate: vi.fn(),
}));

vi.mock("../../../viewmodel/viewmodels/authViewModel", () => ({
    authViewModel: {
        login: vi.fn(),
    },
}));

describe("Login Component", () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    it("shows success message when login succeeds", async () => {
        authViewModel.login.mockResolvedValueOnce({
            success: "Login successful",
            error: null,
        });

        render(Login);

        await fireEvent.input(screen.getByPlaceholderText("Email"), {
            target: { value: "person@gmail.com" },
        });
        await fireEvent.input(screen.getByPlaceholderText("Password"), {
            target: { value: "password" },
        });
        await fireEvent.click(screen.getByRole("button", { name: "Log In" }));

        expect(await screen.findByText("Login successful")).toBeInTheDocument();
        expect(screen.getByText("Login successful")).toHaveClass(
            "success-message"
        );
    });
});
