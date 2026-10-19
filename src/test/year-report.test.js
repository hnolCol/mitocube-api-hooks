import { act, renderHook, waitFor } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createYearReportAPI } from "../hooks/reports/year_report";

const createWrapper = () => {
    const queryClient = new QueryClient({
        defaultOptions: { queries: { retry: false } }
    });
    return ({ children }) => (
        <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    );
};

const createMockClient = (handler) => {
    return {
        get: jest.fn(async (url, config) => ({ data: handler(url, config?.params) }))
    };
};

test("useGetReportYears calls the years endpoint", async () => {
    const client = createMockClient(() => [2023, 2024]);
    const { useGetReportYears } = createYearReportAPI(client);
    const { result } = renderHook(
        () => useGetReportYears(),
        { wrapper: createWrapper() }
    );
    await waitFor(() => expect(result.current.isSuccess).toBe(true));
    expect(client.get).toHaveBeenCalledWith("/reports/years");
    expect(result.current.data).toEqual([2023, 2024]);
});

test("useGetYearReport interpolates the year", async () => {
    const client = createMockClient(() => ({ year: 2024 }));
    const { useGetYearReport } = createYearReportAPI(client);
    const { result } = renderHook(
        () => useGetYearReport({ year: 2024 }),
        { wrapper: createWrapper() }
    );
    await waitFor(() => expect(result.current.isSuccess).toBe(true));
    expect(client.get).toHaveBeenCalledWith("/reports/year/2024");
    expect(result.current.data).toEqual({ year: 2024 });
});

test("useDownloadYearReport requests the download endpoint as a blob with the format param", async () => {
    const client = createMockClient(() => new Blob(["report"]));
    const { useDownloadYearReport } = createYearReportAPI(client);
    const { result } = renderHook(
        () => useDownloadYearReport(),
        { wrapper: createWrapper() }
    );
    await act(async () => {
        result.current.mutate({ year: 2024, format: "md" });
    });
    await waitFor(() => expect(result.current.isSuccess).toBe(true));
    expect(client.get).toHaveBeenCalledWith("/reports/year/2024/download", {
        params: { format: "md" },
        responseType: "blob"
    });
});

test("useDownloadYearReport defaults to the xlsx format", async () => {
    const client = createMockClient(() => new Blob(["report"]));
    const { useDownloadYearReport } = createYearReportAPI(client);
    const { result } = renderHook(
        () => useDownloadYearReport(),
        { wrapper: createWrapper() }
    );
    await act(async () => {
        result.current.mutate({ year: 2023 });
    });
    await waitFor(() => expect(result.current.isSuccess).toBe(true));
    expect(client.get).toHaveBeenCalledWith("/reports/year/2023/download", {
        params: { format: "xlsx" },
        responseType: "blob"
    });
});
