import type { CommitSelectedEvent } from '../../eventBus';
import type { Serialized } from '../../system/serialize';
import type { WebviewsController } from '../webviewsController';
import type { ShowWipArgs, State } from './protocol';

export type CommitDetailsWebviewShowingArgs = [Partial<CommitSelectedEvent['data']> | ShowWipArgs];

export function registerCommitDetailsWebviewView(controller: WebviewsController) {
	return controller.registerWebviewView<State, Serialized<State>, CommitDetailsWebviewShowingArgs>(
		{
			id: 'gitlens.views.commitDetails',
			fileName: 'commitDetails.html',
			title: '检查',
			contextKeyPrefix: `gitlens:webviewView:commitDetails`,
			trackingFeature: 'commitDetailsView',
			plusFeature: false,
			webviewHostOptions: {
				retainContextWhenHidden: false,
			},
		},
		async (container, host) => {
			const { CommitDetailsWebviewProvider } = await import(
				/* webpackChunkName: "webview-commitDetails" */ './commitDetailsWebview'
			);
			return new CommitDetailsWebviewProvider(container, host, { attachedTo: 'default' });
		},
	);
}

export function registerGraphDetailsWebviewView(controller: WebviewsController) {
	return controller.registerWebviewView<State, Serialized<State>, CommitDetailsWebviewShowingArgs>(
		{
			id: 'gitlens.views.graphDetails',
			fileName: 'commitDetails.html',
			title: '提交图形检查',
			contextKeyPrefix: `gitlens:webviewView:graphDetails`,
			trackingFeature: 'graphDetailsView',
			plusFeature: false,
			webviewHostOptions: {
				retainContextWhenHidden: false,
			},
		},
		async (container, host) => {
			const { CommitDetailsWebviewProvider } = await import(
				/* webpackChunkName: "webview-commitDetails" */ './commitDetailsWebview'
			);
			return new CommitDetailsWebviewProvider(container, host, { attachedTo: 'graph' });
		},
	);
}
