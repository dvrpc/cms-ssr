import React from "react";
import SVG_1a from "-!svg-react-loader?name=SVG_1a!../../images/workprogram/1a.svg";
import SVG_1b from "-!svg-react-loader?name=SVG_1b!../../images/workprogram/1b.svg";
import SVG_1c from "-!svg-react-loader?name=SVG_1c!../../images/workprogram/1c.svg";
import SVG_1d from "-!svg-react-loader?name=SVG_1d!../../images/workprogram/1d.svg";
import SVG_1e from "-!svg-react-loader?name=SVG_1e!../../images/workprogram/1e.svg";
import SVG_2a from "-!svg-react-loader?name=SVG_2a!../../images/workprogram/2a.svg";
import SVG_2b from "-!svg-react-loader?name=SVG_2b!../../images/workprogram/2b.svg";
import SVG_2c from "-!svg-react-loader?name=SVG_2c!../../images/workprogram/2c.svg";
import SVG_2d from "-!svg-react-loader?name=SVG_2d!../../images/workprogram/2d.svg";
import SVG_2e from "-!svg-react-loader?name=SVG_2e!../../images/workprogram/2e.svg";
import SVG_3a from "-!svg-react-loader?name=SVG_3a!../../images/workprogram/3a.svg";
import SVG_3b from "-!svg-react-loader?name=SVG_3b!../../images/workprogram/3b.svg";
import SVG_3c from "-!svg-react-loader?name=SVG_3c!../../images/workprogram/3c.svg";
import SVG_3d from "-!svg-react-loader?name=SVG_3d!../../images/workprogram/3d.svg";
import SVG_3e from "-!svg-react-loader?name=SVG_3e!../../images/workprogram/3e.svg";
import SVG_4a from "-!svg-react-loader?name=SVG_4a!../../images/workprogram/4a.svg";
import SVG_4b from "-!svg-react-loader?name=SVG_4b!../../images/workprogram/4b.svg";
import SVG_4c from "-!svg-react-loader?name=SVG_4c!../../images/workprogram/4c.svg";
import SVG_4d from "-!svg-react-loader?name=SVG_4d!../../images/workprogram/4d.svg";
import SVG_4e from "-!svg-react-loader?name=SVG_4e!../../images/workprogram/4e.svg";
import {
  type Project,
  type FundingDetails,
  type LRPImages,
  type Amendment,
  HighlightFund,
} from "./WorkProgramView.types";

const images: Record<string, React.FC<React.SVGProps<SVGElement>>> = {
  "1a": SVG_1a,
  "1b": SVG_1b,
  "1c": SVG_1c,
  "1d": SVG_1d,
  "1e": SVG_1e,
  "2a": SVG_2a,
  "2b": SVG_2b,
  "2c": SVG_2c,
  "2d": SVG_2d,
  "2e": SVG_2e,
  "3a": SVG_3a,
  "3b": SVG_3b,
  "3c": SVG_3c,
  "3d": SVG_3d,
  "3e": SVG_3e,
  "4a": SVG_4a,
  "4b": SVG_4b,
  "4c": SVG_4c,
  "4d": SVG_4d,
  "4e": SVG_4e,
};

const USDollar = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0,
});

export default function WorkProgramProjectView({
  project,
  year,
}: {
  project: Project | Amendment;
  year: string;
}) {
  return (
    project && (
      <article>
        <h2>
          PROJECT: {project.proid} - {project.proname}
        </h2>
        <table className="w-full">
          <tbody className="border-0">
            <tr>
              <th className="w-1 whitespace-nowrap pr-8 text-left">
                Responsible Agency:
              </th>
              <td>{project.respagency}</td>
            </tr>
            <tr>
              <th className="w-1 whitespace-nowrap pr-8 text-left">
                Program Coordinator:
              </th>
              <td>{project.coordinator}</td>
            </tr>
            <tr>
              <th className="w-1 whitespace-nowrap pr-8 text-left">
                Project Manager(s):
              </th>
              <td>{project.managers}</td>
            </tr>
            {project.lrpimages && (
              <tr>
                <th className="w-1 whitespace-nowrap pr-8 text-left">
                  Supports LRP Goals:
                </th>
                <td>
                  <div className="inline-flex gap-1">
                    {Object.values(
                      (JSON.parse(project.lrpimages) as LRPImages[])[0]
                    ).map((image) => {
                      if (image) {
                        const Svg = images[image.split(".")[0]];
                        return (
                          <Svg key={image} className="h-[21px] w-[21px]" />
                        );
                      }
                    })}
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
        <h3 className="my-2 font-bold underline">Goals:</h3>
        <div dangerouslySetInnerHTML={{ __html: project.goals ?? "" }} />
        <h3 className="my-2 font-bold underline">Description:</h3>
        <div dangerouslySetInnerHTML={{ __html: project.description ?? "" }} />
        <h3 className="my-2 font-bold underline">Tasks:</h3>
        <div dangerouslySetInnerHTML={{ __html: project.tasks ?? "" }} />
        <h3 className="my-2 font-bold underline">Products:</h3>
        <div dangerouslySetInnerHTML={{ __html: project.products ?? "" }} />
        <h3 className="my-2 font-bold underline">Beneficiaries:</h3>
        <div
          dangerouslySetInnerHTML={{ __html: project.beneficiaries ?? "" }}
        />
        <h3 className="my-2 font-bold underline">Project Cost and Funding:</h3>
        <table className="w-full border-y-2 border-black">
          <thead>
            <tr className="border-y border-black">
              <th className="pt-1 text-left">FY</th>
              <th className="pt-1">Total</th>
              <th className="pt-1">Highway PL Program</th>
              <th className="pt-1">Transit PL Program</th>
              <th className="pt-1">Comprehensive Planning</th>
              <th className="pt-1">Other</th>
            </tr>
          </thead>
          <tbody>
            {(JSON.parse(project.funding_details ?? "[]") as FundingDetails[])
              .sort((a, b) => a.fy - b.fy)
              .map((row) => (
                <tr
                  key={row.fy + row.total}
                  className={
                    "highlightfund" in project &&
                    [HighlightFund.Both, HighlightFund.Table].some(
                      (i) => i === project.highlightfund
                    )
                      ? "border-y border-black bg-yellow-500"
                      : "border-y border-black"
                  }
                >
                  <td className="pt-1 text-left">{row.fy}</td>
                  <td className="pt-1 text-center">
                    {row.total && USDollar.format(+row.total)}
                  </td>
                  <td className="pt-1 text-center">
                    {row.highway && USDollar.format(+row.highway)}
                  </td>
                  <td className="pt-1 text-center">
                    {row.transit && USDollar.format(+row.transit)}
                  </td>
                  <td className="pt-1 text-center">
                    {row.comprehensive && USDollar.format(+row.comprehensive)}
                  </td>
                  <td className="pt-1 text-center">
                    {row.other && USDollar.format(+row.other)}
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
        {project.fundingnote && (
          <>
            <p>{year} Other Funding Details:</p>
            <p
              dangerouslySetInnerHTML={{ __html: project.fundingnote }}
              className={
                "highlightfund" in project &&
                [HighlightFund.Both, HighlightFund.Notes].some(
                  (i) => i === project.highlightfund
                )
                  ? "bg-yellow-500"
                  : ""
              }
            />
          </>
        )}
      </article>
    )
  );
}
