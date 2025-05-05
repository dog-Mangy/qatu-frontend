import { render } from "@testing-library/svelte";
import FormInput from "../FormInput.Component.svelte";

describe("FormInput Component", () => {
    it("should render text input by default", () => {
        const { getByRole } = render(FormInput, {
            props: { id: "test-input", placeholder: "Enter text" },
        });

        const input = getByRole("textbox");
        expect(input).toHaveAttribute("type", "text");
        expect(input).toHaveAttribute("id", "test-input");
        expect(input).toHaveAttribute("placeholder", "Enter text");
    });

    it("should render email input when type is email", () => {
        const { getByRole } = render(FormInput, {
            props: { type: "email", id: "email-input" },
        });

        const input = getByRole("textbox");
        expect(input).toHaveAttribute("type", "email");
    });

    it("should render password input when type is password", () => {
        const { container } = render(FormInput, {
            props: { type: "password", id: "password-input" },
        });

        const input = container.querySelector("input");
        expect(input).toHaveAttribute("type", "password");
    });

    it("should set required attribute when required is true", () => {
        const { getByRole } = render(FormInput, {
            props: { required: true, id: "required-input" },
        });

        const input = getByRole("textbox");
        expect(input).toBeRequired();
    });
});
