import Head from 'next/head';
import { ReactNode } from 'react';
import { Block } from 'suomifi-ui-components';
import Breadcrumbs from './breadcrumbs';

interface Props {
  title: string;
  children: ReactNode;
}

export default function Page(props: Props) {
  const { title, children } = props;

  return (
    <>
      <Head>
        <title>{title} - Living in Finland</title>
      </Head>
      <Block variant="main">
        <Breadcrumbs />
        <div className="md:my-8 md:border">{children}</div>
      </Block>
    </>
  );
}
