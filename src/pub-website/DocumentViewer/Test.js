import React, { useState } from 'react';
import { Document, Page } from 'react-pdf';

export default function Test() {
    const [numPages, setNumPages] = useState(null);
    const [pageNumber, setPageNumber] = useState(1);

    function onDocumentLoadSuccess({ numPages }) {
        setNumPages(numPages);
    }

    return (
        <div>
            <Document
                file={{
                    url: 'http://localhost:5000/api/file/showfile'
                    // url: 'http://localhost:5000/api/file/showfile?access_tokem=asdasd'
                }}
                onLoadSuccess={onDocumentLoadSuccess}
            >
                <Page pageNumber={pageNumber} />
            </Document>
            <p>Page {pageNumber} of {numPages}</p>
        </div>
    );
}