import Head from 'next/head'
import Link from 'next/link'
import CreateForm from './form/CreateForm'
import All_form from './_all_form'
import NavBar from "./../components/NavBar"
export default function Home() {
  return (
    <div className="container">
      <NavBar/>
      <Link href="/form/CreateForm">Form</Link>
      <All_form/>
    </div>
  )
}
