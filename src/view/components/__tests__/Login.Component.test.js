import { render, fireEvent, screen } from "@testing-library/svelte";
import Login from "../Login.Component.svelte";
import { vi } from "vitest";
import { authViewModel } from "../../../viewmodel/viewmodels/authViewModel";
import { navigate } from "svelte-routing";

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

    it("shows error message when login fails", async () => {
        authViewModel.login.mockResolvedValueOnce({
            error: "Invalid credentials",
            success: null,
        });

        render(Login);

        await fireEvent.input(screen.getByPlaceholderText("Email"), {
            target: { value: "person@gmail.com" },
        });
        await fireEvent.input(screen.getByPlaceholderText("Password"), {
            target: { value: "wrongpassword" },
        });
        await fireEvent.click(screen.getByRole("button", { name: "Log In" }));

        expect(
            await screen.findByText("Invalid credentials")
        ).toBeInTheDocument();
        expect(screen.getByText("Invalid credentials")).toHaveClass(
            "error-message"
        );
    });

    it("calls login function with correct credentials", async () => {
        authViewModel.login.mockResolvedValueOnce({
            success: "Login successful",
        });

        render(Login);

        const testCredentials = {
            email: "person@gmail.com",
            password: "password123",
        };

        await fireEvent.input(screen.getByPlaceholderText("Email"), {
            target: { value: testCredentials.email },
        });
        await fireEvent.input(screen.getByPlaceholderText("Password"), {
            target: { value: testCredentials.password },
        });
        await fireEvent.click(screen.getByRole("button", { name: "Log In" }));

        expect(authViewModel.login).toHaveBeenCalledWith(testCredentials);
    });

    it("navigates to register page when register button is clicked", async () => {
        render(Login);
        await fireEvent.click(screen.getByRole("button", { name: "Register" }));
        expect(navigate).toHaveBeenCalledWith("/register");
    });
});
