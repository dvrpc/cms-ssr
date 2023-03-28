import React from "react";
import { default as Layout } from "../../layouts/MigrationLayout";

const CommitteePage = ({ serverData }) => {
  const commiteePreface = {
    Chair: serverData.Chair,
    "Vice-Chair": serverData.Vicechair,
    Coordinator: serverData.Coordinator,
    "Assistant Coordinator": serverData.Asstcoordinator,
    "Meeting Frequency": serverData.Meetingfreq,
  };

  return (
    <Layout>
      <div className="flex flex-col space-y-2">
        <h1 className="text-2xl font-bold">{serverData.Name}</h1>
        <p>
          {Object.keys(commiteePreface).map((key) => {
            if (commiteePreface[key]) {
              return (
                <div>
                  <b>{key}:</b> {commiteePreface[key]}
                </div>
              );
            }
          })}
        </p>
        {/<[a-z][\s\S]*>/i.test(serverData.Details) ? (
          <div dangerouslySetInnerHTML={{ __html: serverData.Details }} />
        ) : (
          <p>{serverData.Details}</p>
        )}
        <small>
          Minutes are draft until approved by the committee members.
        </small>
        <div>
          <h3 className="text-lg font-bold">Meetings</h3>
          <table className="table-auto">
            <thead></thead>
            <tbody>
              {serverData.Agendas.map((agenda) => {
                const date = new Date(agenda.Meetingdate);
                return (
                  <tr>
                    <td>
                      <b>{date.toLocaleString("en-US", { month: "short" })}</b>{" "}
                      {date.toLocaleString("en-US", { year: "numeric" })}
                    </td>
                    <td>
                      <div className="flex divide-x">
                        <a
                          className="px-2"
                          href={`/committees/${serverData.Shortname.toLowerCase()}/${
                            agenda.Id
                          }`}
                        >
                          Agenda
                        </a>
                        <a className="px-2">Meeting/Highlights</a>
                        <a className="px-2">Presentations</a>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </Layout>
  );
};

export default CommitteePage;

export async function getServerData(context) {
  try {
    const res = await fetch(
      `https://www.dvrpc.org/api/committees/${context.params.name}`
    );
    if (!res.ok) {
      throw new Error("Response failed");
    }

    return {
      props: await res.json(),
    };
  } catch (error) {
    return {
      status: 500,
      headers: {},
      props: {},
    };
  }
}
