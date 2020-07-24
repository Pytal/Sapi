import Head from 'next/head'

interface TitleProps { children: string }

export const Title = ({ children: title }: TitleProps) => (
  <Head><title>{title}</title></Head>
)
