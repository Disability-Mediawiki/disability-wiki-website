import React, { useState } from "react";
import ReactDOM from 'react-dom';
import { Document, Page } from "react-pdf";
import { Worker } from '@react-pdf-viewer/core';
import { Viewer, SpecialZoomLevel } from '@react-pdf-viewer/core';

export default function SinglePage() {
    const [numPages, setNumPages] = useState(null);
    const [pageNumber, setPageNumber] = useState(1); //setting 1 to show fisrt page

    function onDocumentLoadSuccess({ numPages }) {
        setNumPages(numPages);
        setPageNumber(1);
    }

    function changePage(offset) {
        setPageNumber(prevPageNumber => prevPageNumber + offset);
    }

    function previousPage() {
        changePage(-1);
    }

    function nextPage() {
        changePage(1);
    }
    const [shown, setShown] = useState(false);

    const modalBody = () => (
        <div
            style={{
                backgroundColor: '#fff',
                flexDirection: 'column',
                overflow: 'hidden',

                /* Fixed position */
                left: 0,
                position: 'fixed',
                top: 0,

                /* Take full size */
                height: '100%',
                width: '100%',

                /* Displayed on top of other elements */
                zIndex: 9999,
            }}
        >
            <div
                style={{
                    alignItems: 'center',
                    backgroundColor: '#000',
                    color: '#fff',
                    display: 'flex',
                    padding: '.5rem',
                }}
            >
                <div style={{ marginRight: 'auto' }}>sample-file-name.pdf</div>
                <button
                    style={{
                        backgroundColor: '#357edd',
                        border: 'none',
                        borderRadius: '4px',
                        color: '#ffffff',
                        cursor: 'pointer',
                        padding: '8px',
                    }}
                    onClick={() => setShown(false)}
                >
                    Close
                </button>
            </div>
            <div
                style={{
                    flexGrow: 1,
                    overflow: 'auto',
                }}
            >
                <Viewer fileUrl={'http://localhost:5000/api/file/showfile'} defaultScale={SpecialZoomLevel.PageFit} />
            </div>
        </div>
    );

    const a = () => {
        return (<Viewer fileUrl={'http://localhost:5000/api/file/showfile'} defaultScale={SpecialZoomLevel.PageFit} />
        )
    }
    return (
        ReactDOM.createPortal(a(), document.body)


    );
}
{/*
        <>
             <button
                style={{
                    backgroundColor: '#00449e',
                    border: 'none',
                    borderRadius: '.25rem',
                    color: '#fff',
                    cursor: 'pointer',
                    padding: '.5rem',
                }}
                onClick={() => setShown(true)}
            >
                Open modal
            </button>
            {shown && ReactDOM.createPortal(modalBody(), document.body)} 
        </>*/}