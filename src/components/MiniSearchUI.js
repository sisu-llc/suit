// @flow

import React from 'react';
import PropTypes from 'prop-types';

import NavbarSearch from '../components/NavbarSearch';
import SearchResults from '../components/SearchResults';
import Scrollable from '../components/Scrollable';
import SearchResultsCount from '../components/SearchResultsCount';
import ObjectUtils from '../util/ObjectUtils';

type MiniSearchUIProps = {
  /**
   * A scale (1.0 = 100%) to use when rendering the search results part of
   * the MiniSearchUI. Optional—defaults to 100%.
   */
  scale: number;
};

type MiniSearchUIDefaultProps = {
  scale: number;
};

/**
 * A miniature, self-contained component that presentds super simple search UI including a text field for the
 * query, an indication of the number or results or error from the wuery, and a small, scrollable results area
 * showing the resulting documents. It must be nested inside a Searcher component and will use that parent
 * Searcher to manage its state.
 */
export default class MiniSearchUI extends React.Component<MiniSearchUIDefaultProps, MiniSearchUIProps, void> {
  static defaultProps = {
    scale: 1.0,
  };

  static contextTypes = {
    searcher: PropTypes.any,
  };

  render() {
    return (
      <div style={{ minHeight: '50vh' }}>
        <NavbarSearch
          onSearch={this.context.searcher.doSearch}
          updateSearchString={this.context.searcher.updateQuery}
          value={this.context.searcher.state.query}
          style={{
            marginLeft: '8px',
          }}
        />
        <SearchResultsCount style={{ marginLeft: '20px', paddingBottom: '8px' }} />
        <Scrollable
          style={{
            height: '428px',
            width: '100%',
            borderTop: '1px solid #ccc',
            borderRight: '1px solid #ccc',
            borderLeft: '1px solid #ccc',
          }}
        >
          <SearchResults
            format="simple"
            entityFields={ObjectUtils.toMap([])}
            style={{
              transform: `scale(${this.props.scale}, ${this.props.scale})`,
            }}
          />
        </Scrollable>
      </div>
    );
  }
}
