import { useQuery } from "@tanstack/react-query";
import { subDays } from "date-fns";
import { useSearchParams } from "react-router-dom";
import { getStaysAfterDate } from "../../services/apiBookings";

export function useRecentStays() {
  const [searchParams] = useSearchParams();
  const numDays = !searchParams.get("last")
    ? 7
    : Number(searchParams.get("last"));
  const queryDate = subDays(new Date(), numDays).toISOString();

  const { data, isLoading } = useQuery({
    queryKey: ["stays", numDays],
    queryFn: () => getStaysAfterDate(queryDate),
  });

  const confirmedStays = data?.filter(
    (stay) => stay.status === "checked-in" || stay.status === "checked-out"
  );

  return { data, isLoading, confirmedStays };
}
