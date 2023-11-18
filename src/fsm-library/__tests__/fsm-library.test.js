// eslint-disable-next-line no-unused-vars
import React from 'react';
import {fireEvent, render} from '@testing-library/react';
import {MachineProvider, useMachineContext} from '../MachineProvider';

const machineMock = {
    initialState: 'idle',
    name: 'Test Machine',
    states: {
        idle: {
            transitions: {
                FETCH: 'loading'
            }
        },
        loading: {
            transitions: {
                RESOLVE: 'data'
            }
        }
    }
};

// eslint-disable-next-line no-undef
test('provides the fsm through context', () => {
    const TestComponent = () => {
        const [state, transition] = useMachineContext();
        return state === 'idle'?  <div onClick={() => transition('FETCH')}>{state}</div> : <div>{state}</div>;
    };

    const { getByText } = render(
        <MachineProvider machine={machineMock}>
            <TestComponent />
        </MachineProvider>
    )

    // First check if initial state is 'idle'
    const idleDiv = getByText('idle');
    // eslint-disable-next-line no-undef
    expect(idleDiv).toBeTruthy();

    // Fire a click event that triggers the state change
    fireEvent.click(idleDiv);

    // Then check if state is updated to 'loading'
    // eslint-disable-next-line no-undef
    expect(getByText('loading')).toBeTruthy();
});