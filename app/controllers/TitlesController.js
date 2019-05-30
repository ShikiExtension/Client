class TitlesController {
    title(url) {
        const titleId = url.split('-', 2).shift();
        if (!titleId)
            throw new NotFoundHttpException();

        console.log({
            url,
            titleId
        });
    }
}