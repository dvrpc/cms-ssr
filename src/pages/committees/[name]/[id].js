import React from "react";

const AgendaPage = ({ serverData }) => {
  const date = new Date(serverData.Meetingdate);
  const { Id, CommitteeId, Committee, Meetingdate, Meetingdetail, ...preface } =
    serverData;

  return (
    <div className="flex flex-col space-y-2">
      <h1 className="text-2xl font-bold">{serverData.Committee.Name}</h1>
      <b>
        {date.toLocaleDateString("en-us", {
          month: "long",
          day: "numeric",
          year: "numeric",
        })}
      </b>
      {Object.keys(preface).map((key) => {
        if (preface[key]) {
          {
            return /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g.test(
              preface[key]
            ) ? (
              <>
                <a href={preface[key]}>{preface[key]}</a>
                <br />
              </>
            ) : (
              <div>{preface[key]}</div>
            );
          }
        }
      })}
      <div
        className="prose"
        dangerouslySetInnerHTML={{ __html: serverData.Meetingdetail }}
      />
    </div>
  );
};

export default AgendaPage;

export async function getServerData(context) {
  try {
    const res = await fetch(
      `https://www.dvrpc.org/api/agenda/${context.params.id}`
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
