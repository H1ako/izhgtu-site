import {GetServerSidePropsContext} from "next";

export default function Info(context: GetServerSidePropsContext) {
  console.log(context)
  return (
    <div>info page</div>
  )
}
