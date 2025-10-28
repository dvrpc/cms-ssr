import React, { useState } from "react";
import HtmlParser from "./HtmlParser";
import Body from "./Body";
import StaffContact from "./StaffContact";
import useData from "./common/useData";

const CommitteePage = ({ body, title, navItem, location, staffContact }) => {
  const [loading, setLoading] = useState(true);
  const { isLoading, data } = useData(
    `https://apis.dvrpc.org/internal/dvrpcagenda/agendas/agenda?committee=${location
      .split("/")
      .filter(Boolean)
      .reverse()[0]
      .toUpperCase()}&limit=100`
  );

  const [current, archive] = data?.items?.reduce(
    (result, agenda) => {
      const isCurrent =
        new Date(agenda.meetingdate) >
        new Date().setFullYear(new Date().getFullYear() - 1);

      const date = new Date(agenda.meetingdate).toISOString().slice(0, 7);
      const minutesURL = `https://www.dvrpc.org/asp/committee/committees/${agenda.committeeid}/${date}.pdf`;
      const presentationsURL = `https://www.dvrpc.org/asp/committee/committees/${agenda.committeeid}/presentations/${date}.pdf`;

      // @TODO: only check this years documents for 404 assume past years are uploaded for now
      if (isCurrent) {
        const minutes = fetch(minutesURL, { method: "HEAD" }).then((res) => {
          if (res.ok) agenda.minutes = minutesURL;
        });
        const presentations = fetch(presentationsURL, { method: "HEAD" }).then(
          (res) => {
            if (res.ok) agenda.presentations = presentationsURL;
          }
        );
        Promise.all([minutes, presentations]).then(() => setLoading(false));
      } else {
        agenda.minutes = minutesURL;
        agenda.presentations = presentationsURL;
      }

      result[isCurrent ? 0 : 1].push(agenda);
      return result;
    },
    [[], []]
  ) ?? [[], []];

  const renderRow = (agenda) => {
    const date = new Date(agenda.meetingdate);
    return (
      <tr key={agenda.id}>
        <td className="align-top">
          <b>{date.toLocaleString("en-US", { month: "short" })}</b>{" "}
          {date.toLocaleString("en-US", { year: "numeric" })}
        </td>
        <td className="w-3/4">
          {agenda.title ? <em>{agenda.title}</em> : null}
          <div className="flex gap-2 divide-x underline">
            <a href={`/committees/${agenda.committeeid}/${agenda.id}`}>
              Agenda
            </a>
            {agenda.minutes && <a href={agenda.minutes}>Meeting/Highlights</a>}
            {agenda.presentations && (
              <a href={agenda.presentations}>Presentations</a>
            )}
            {agenda.comments && <a href={agenda.comments}>Comments</a>}
            {agenda.note2 && <a href={agenda.note2}>Recording</a>}
          </div>
        </td>
      </tr>
    );
  };

  const { data: dataCommittee, isLoading: isLoadingCommittee } = useData(
    "https://apis.dvrpc.org/internal/dvrpcagenda/agendas/committee?id=PPTF"
  );

  return (
    <>
      <Body title={title} menu={navItem}>
        <HtmlParser html={body ?? ""} />
        {isLoading ? (
          <div className="h-40 animate-pulse">
            <p className="my-4 h-4 w-64 bg-gray-300" />
            <p className="my-4 h-4 w-56 bg-gray-300" />
            <h4 className="mb-4 h-6 w-60 bg-gray-300 pr-8" />
            <p className="h-32 w-96 bg-gray-300"></p>
            <p className="h-8"></p>
          </div>
        ) : (
          <>
            <table className="table w-full table-fixed">
              {Object.entries({
                "Chair(s)": dataCommittee.chari,
                "Vice-Chair": dataCommittee.vicechair,
                Coordinator: dataCommittee.coordinator,
                "Assistant Coordinator": dataCommittee.asstcoordinator,
                "Meeting Frequency": dataCommittee.meetingfreq,
              })
                .filter(([key, val]) => !!val)
                .map(([key, val]) => (
                  <tr key={key}>
                    <th>{key}:</th> <td className="w-3/4">{val}</td>
                  </tr>
                ))}
            </table>
            {dataCommittee.Shortname === "BOARD" ? (
              <small>
                Minutes are draft until approved by the committee members.
              </small>
            ) : null}
            <h3 className="text-lg font-bold">Meetings</h3>
            <table className="w-full table-auto">
              <tbody>{!loading && current.map(renderRow)}</tbody>
            </table>
            {archive.length > 0 ? (
              <details>
                <summary>Past Meetings</summary>
                <table className="ml-0 mr-0 w-full table-auto">
                  <tbody>{archive.map(renderRow)}</tbody>
                </table>
              </details>
            ) : null}
          </>
        )}
      </Body>
      <StaffContact
        staffContact={staffContact}
        location={location}
        title={title}
      />
    </>
  );
};

export default CommitteePage;
