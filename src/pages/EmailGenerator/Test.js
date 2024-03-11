import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import EmailGenerator from "./EmailGenerator";
import { act } from "react-dom/test-utils"; // Import act for async testing

const mockAxios = new MockAdapter(axios);

jest.mock("axios");

describe("EmailGenerator", () => {
  beforeEach(() => {
    mockAxios.reset();
  });

  it('should make a POST request when the "Generate" button is clicked', async () => {
    render(<EmailGenerator />);

    // Mock user input
    fireEvent.change(screen.getByLabelText(/company name/i), {
      target: { value: "TestCompany" },
    });

    fireEvent.change(screen.getByLabelText(/role/i), {
      target: { value: "TestRole" },
    });

    // Mock axios.post to return a successful response
    mockAxios.onPost("https://example.com/api/your-endpoint").reply(200, {
      data: "Success",
    });

    // Click the "Generate" button
    act(() => {
      fireEvent.click(screen.getByText(/generate/i));
    });

    // Wait for the POST request to be made and the response to be handled
    await waitFor(() => {
      expect(mockAxios.history.post.length).toBe(1);
      expect(mockAxios.history.post[0].data).toBe(
        JSON.stringify({
          role: "TestRole",
          companyName: "TestCompany",
          userEmail: "",
        })
      );
      // You can also assert on the component's state or rendered UI accordingly
    });
  });
});
