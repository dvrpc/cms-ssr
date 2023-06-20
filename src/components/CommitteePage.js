import React from "react";

import HtmlParser from "./HtmlParser";
import Body from "./Body";
import StaffContact from "./StaffContact";
import useData from "./common/useData";

const CommitteePage = ({ body, title, navItem, location, staffContact }) => {
  const { isLoading, data } = useData(
    `https://www.dvrpc.org/api/committees/${
      location.split("/").filter(Boolean).reverse()[0]
    }`
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
            <h3>Information</h3>
            <dl>
              {Object.entries({
                "Chair(s)": data.Chair,
                "Vice-Chair": data.Vicechair,
                Coordinator: data.Coordinator,
                "Assistant Coordinator": data.Asstcoordinator,
                "Meeting Frequency": data.Meetingfreq,
              })
                .filter(([key, val]) => !!val)
                .map(([key, val]) => (
                  <React.Fragment key={key}>
                    <dt>{key}:</dt> <dd>{val}</dd>
                  </React.Fragment>
                ))}
            </dl>
            <small>
              Minutes are draft until approved by the committee members.
            </small>
            <h3 className="text-lg font-bold">Meetings</h3>
            <table className="table-auto">
              <tbody>
                {data?.Agendas?.map((agenda) => {
                  const date = new Date(agenda.Meetingdate);
                  return (
                    <tr key={agenda.Id}>
                      <td className="align-top">
                        <b>
                          {date.toLocaleString("en-US", { month: "short" })}
                        </b>{" "}
                        {date.toLocaleString("en-US", { year: "numeric" })}
                      </td>
                      <td>
                        {agenda.Title ? <em>{agenda.Title}</em> : null}
                        <div className="flex gap-2 divide-x underline">
                          <a
                            href={`/committees/${data.Shortname}/${agenda.Id}`}
                          >
                            Agenda
                          </a>
                          {agenda.Minutes && (
                            <a href={agenda.Minutes}>Meeting/Highlights</a>
                          )}
                          {agenda.Presentations && (
                            <a href={agenda.Presentations}>Presentations</a>
                          )}
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
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
