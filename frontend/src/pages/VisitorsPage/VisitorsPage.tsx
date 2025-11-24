import { useEffect, useState } from "react";
import type { FC } from "react";
import "./VisitorsPage.css";
import { Header, Filters, VisitorsTable } from "../../components/VisitorsPage";
import type { Visitor } from "../../utils/visitorTypes";
import { useSearchParams } from "react-router-dom";

const VisitorsPage: FC = () => {
  const [visitors, setVisitors] = useState<Visitor[]>([]);
  const [searchParams, setSearchParams] = useSearchParams();

  const presenceFilter = searchParams.get("presence") || "Без фильтра";
  const searchTerm = searchParams.get("search") || "";

  const setPresenceFilter = (value: string) => {
    setSearchParams((prev) => {
      const next = new URLSearchParams(prev);
      next.set("presence", value);
      return next;
    });
  };

  const setSearchTerm = (value: string) => {
    searchParams.set("search", value);
    setSearchParams(searchParams);
  };

  const loadVisitors = () => {
    const params = new URLSearchParams();

    if (searchTerm) {
      params.append("fullName_like", searchTerm);
    }

    if (presenceFilter === "Присутствующим") {
      params.append("present", "true");
    } else if (presenceFilter === "Отсутствующим") {
      params.append("present", "false");
    }

    fetch(
      `https://visitor-1-gh2z.onrender.com/visitors?${params.toString()}`
    )
      .then((res) => res.json())
      .then((data) => setVisitors(data))
      .catch((err) => console.error("Ошибка загрузки данных:", err));
  };

  useEffect(() => {
    loadVisitors();
  }, [searchTerm, presenceFilter]);

  const presentCount = visitors.filter((v) => v.present).length;
  const absentCount = visitors.filter((v) => !v.present).length;

  return (
    <div>
      <Header
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        presentCount={presentCount}
        absentCount={absentCount}
        onVisitorAdded={loadVisitors}
      />
      <VisitorsTable visitors={visitors} onSuccess={loadVisitors} />
      <Filters
        presenceFilter={presenceFilter}
        setPresenceFilter={setPresenceFilter}
      />
    </div>
  );
};

export default VisitorsPage;
