import Document, { Html, Head, Main, NextScript } from "next/document";
import { StyleProvider, createCache, extractStyle } from '@ant-design/cssinjs';

/* 
  Issue Flash of unstyled content for first load:
  https://github.com/ant-design/ant-design/issues/16037#issuecomment-483140458 
  ant-design flash of unstyled content fixed
*/

type MyDocumentProps = {
  styles: React.ReactNode
}

export class MyDocument extends Document<MyDocumentProps> {
  render() {
    return (
      <Html lang="en">
        <Head>{this.props.styles}</Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

MyDocument.getInitialProps = async (ctx) => {
  const originalRenderPage = ctx.renderPage
  const cache = createCache()

  ctx.renderPage = () =>
    originalRenderPage({
      enhanceApp: (App) =>
        function EnhanceApp(props) {
          return (
            <StyleProvider cache={cache}>
              <App {...props} />
            </StyleProvider>
          )
        },
    })

  const initialProps = await Document.getInitialProps(ctx)

  return {
    ...initialProps,
    styles: (
      <>
        {initialProps.styles}
        <style dangerouslySetInnerHTML={{ __html: extractStyle(cache) }} />
      </>
    ),
  }
}

export default MyDocument;



