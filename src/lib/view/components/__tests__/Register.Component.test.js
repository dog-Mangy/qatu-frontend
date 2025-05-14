import { render, fireEvent, screen } from "@testing-library/svelte";
import Register from "../Register.Component.svelte";
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { authViewModel } from "../../../viewmodel/viewmodels/authViewModel";

vi.mock("../../../viewmodel/viewmodels/authViewModel", () => ({
    authViewModel: {
        register: vi.fn(),
    },
}));

describe("Register Component", () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    it("shows success message when registration succeeds", async () => {
        authViewModel.register.mockResolvedValueOnce({
            success: "Registration successful",
            error: "",
        });

        render(Register);

        await fillRegistrationForm({
            name: "John",
            lastName: "Doe",
            email: "john.doe@example.com",
            identificationDocument: "12345678",
            phoneNumber: "1234567890",
            password: "secure123",
            confirmPassword: "secure123",
        });

        await fireEvent.submit(screen.getByTestId("register-form"));

        expect(
            await screen.findByText("Registration successful")
        ).toBeInTheDocument();
        expect(screen.getByText("Registration successful")).toHaveClass(
            "success-message"
        );
    });

    it("shows error message when registration fails", async () => {
        authViewModel.register.mockResolvedValueOnce({
            error: "Registration failed: Email already exists",
            success: "",
        });

        render(Register);

        await fillRegistrationForm({
            name: "John",
            lastName: "Doe",
            email: "existing@example.com",
            identificationDocument: "12345678",
            phoneNumber: "1234567890",
            password: "secure123",
            confirmPassword: "secure123",
        });

        await fireEvent.submit(screen.getByTestId("register-form"));

        expect(
            await screen.findByText("Registration failed: Email already exists")
        ).toBeInTheDocument();
        expect(
            screen.getByText("Registration failed: Email already exists")
        ).toHaveClass("error-message");
    });

    it("calls register function with correct user data", async () => {
        authViewModel.register.mockResolvedValueOnce({
            success: "Registration successful",
            error: "",
        });

        render(Register);

        const userData = {
            name: "Jane",
            lastName: "Smith",
            email: "jane.smith@example.com",
            identificationDocument: "87654321",
            phoneNumber: "0987654321",
            password: "anotherSecure123",
            confirmPassword: "anotherSecure123",
        };

        await fillRegistrationForm(userData);
        await fireEvent.submit(screen.getByTestId("register-form"));

        expect(authViewModel.register).toHaveBeenCalledWith(userData);
    });

    it("has a link to login page", async () => {
        render(Register);
        const link = screen.getByRole("link", { name: "Login" });
        expect(link).toBeInTheDocument();
        expect(link).toHaveAttribute("href", "/#/login");
    });

    async function fillRegistrationForm({
        name,
        lastName,
        email,
        identificationDocument,
        phoneNumber,
        password,
        confirmPassword,
    }) {
        await fireEvent.input(screen.getByPlaceholderText("Name"), {
            target: { value: name },
        });
        await fireEvent.input(screen.getByPlaceholderText("Last Name"), {
            target: { value: lastName },
        });
        await fireEvent.input(screen.getByPlaceholderText("Email"), {
            target: { value: email },
        });
        await fireEvent.input(
            screen.getByPlaceholderText("Identification Document"),
            {
                target: { value: identificationDocument },
            }
        );
        await fireEvent.input(screen.getByPlaceholderText("Phone Number"), {
            target: { value: phoneNumber },
        });
        await fireEvent.input(screen.getByPlaceholderText("Password"), {
            target: { value: password },
        });
        await fireEvent.input(screen.getByPlaceholderText("Confirm Password"), {
            target: { value: confirmPassword },
        });
    }
});