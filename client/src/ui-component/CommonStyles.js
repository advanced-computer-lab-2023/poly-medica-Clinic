export const commonStyles = {
    container: {
        display: 'flex',
        justifyContent: 'space-around',
        alignItems: 'center',
        flexDirection: 'row',
        marginBottom: '5em',
    },
    infoContainer: {
        display: 'flex',
        flexDirection: 'column',
        gap: '0.7em',
    },
    emailContainer: {
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'row',
    },
    iconMargin: {
        marginRight: '0.4em',
    },
    listItemText: {
        width: '60%',
        lineHeight: '1.5em',
        maxHeight: '3em',
    },
    appointmentCard: {
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'column',
        textAlign: 'center'
    },
    accordion: {
        display: 'flex',
        justifyContent: 'space-around',
        flexDirection: 'row',
        textAlign: 'center',
        marginBottom: '2em'
    },

    autoCompleteContainer: {
        display: 'flex',
        justifyContent: 'center',
        marginBottom: '2em'
    },
    autoComplete: {
        '&.MuiAutocomplete-hasPopupIcon .MuiAutocomplete-inputRoot': {
            padding: '0.3em',
            fontSize: '1em',
            fontWeight: 500,
        },
        width: 160
    }
};